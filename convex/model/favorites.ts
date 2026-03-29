import { v } from 'convex/values'
import { QueryCtx, query } from '../_generated/server'
import { getCurrentUser } from '../auth'
import { ensureFP } from '../ensure'

export const listFavorites = query({
  args: {
    filter: v.optional(v.string()),
    sort: v.optional(v.string()),
    query: v.optional(v.string()),
    page: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const itemsPerPage = 10
    const page = args.page ?? 1

    let allFavorites = await ctx.db.query('favorites').collect()

    if (args.query) {
      const q = args.query.toLowerCase()
      allFavorites = allFavorites.filter((f) =>
        f.name.toLowerCase().includes(q)
      )
    }

    if (args.filter && args.filter !== 'all') {
      const filteredIds = new Set<string>()
      const allAtf = await ctx.db.query('artistsToFavorites').collect()
      for (const atf of allAtf) {
        const artist = await ctx.db.get(atf.artistId)
        if (artist && artist.role === args.filter) {
          filteredIds.add(atf.favoriteId)
        }
      }
      allFavorites = allFavorites.filter((f) => filteredIds.has(f._id))
    }

    const sort = args.sort
    if (sort === 'name') {
      allFavorites.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === '-name') {
      allFavorites.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sort === 'publishing_date') {
      allFavorites.sort(
        (a, b) =>
          new Date(a.publishingDate).getTime() -
          new Date(b.publishingDate).getTime()
      )
    } else if (sort === '-publishing_date') {
      allFavorites.sort(
        (a, b) =>
          new Date(b.publishingDate).getTime() -
          new Date(a.publishingDate).getTime()
      )
    } else if (sort === 'most_liked') {
      allFavorites.sort((a, b) => b.likes - a.likes)
    } else {
      allFavorites.sort(
        (a, b) =>
          new Date(b.publishingDate).getTime() -
          new Date(a.publishingDate).getTime()
      )
    }

    const totalCount = allFavorites.length
    const paged = allFavorites.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    )

    const results = await Promise.all(
      paged.map(async (favorite) => {
        const atfs = await ctx.db
          .query('artistsToFavorites')
          .withIndex('by_favorite', (q) => q.eq('favoriteId', favorite._id))
          .collect()

        const artists = await Promise.all(
          atfs.map(async (atf) => {
            const artist = await ctx.db.get(atf.artistId)
            return artist
              ? {
                  _id: artist._id,
                  name: artist.name,
                  role: artist.role,
                  headshotUrl: artist.headshotUrl,
                  slug: artist.slug,
                }
              : null
          })
        )

        const mtfs = await ctx.db
          .query('moviesToFavorites')
          .withIndex('by_favorite', (q) => q.eq('favoriteId', favorite._id))
          .collect()

        const movies = await Promise.all(
          mtfs.map(async (mtf) => await ctx.db.get(mtf.movieId))
        )

        return {
          ...favorite,
          artists: artists.filter(Boolean),
          movies: movies.filter(Boolean),
        }
      })
    )

    return { favorites: results, totalCount }
  },
})

async function _findFavorite(ctx: QueryCtx, slug: string) {
  const favorite = await ctx.db
    .query('favorites')
    .withIndex('by_slug', (q) => q.eq('slug', slug))
    .first()

  if (!favorite) return null

  const user = await getCurrentUser(ctx)

  const atfs = await ctx.db
    .query('artistsToFavorites')
    .withIndex('by_favorite', (q) => q.eq('favoriteId', favorite._id))
    .collect()

  const artists = await Promise.all(
    atfs.map(async (atf) => {
      const artist = await ctx.db.get(atf.artistId)
      return artist
        ? {
            _id: artist._id,
            name: artist.name,
            role: artist.role,
            headshotUrl: artist.headshotUrl,
            slug: artist.slug,
          }
        : null
    })
  )

  const mtfs = await ctx.db
    .query('moviesToFavorites')
    .withIndex('by_favorite', (q) => q.eq('favoriteId', favorite._id))
    .collect()

  const movies = await Promise.all(
    mtfs.map(async (mtf) => await ctx.db.get(mtf.movieId))
  )

  let likedByUser = false
  if (user) {
    const like = await ctx.db
      .query('userLikes')
      .withIndex('by_user_favorite', (q) =>
        q.eq('userId', user._id).eq('favoriteId', favorite._id)
      )
      .first()
    likedByUser = !!like
  }

  return {
    ...favorite,
    likedByUser,
    artists: artists.filter(Boolean),
    movies: movies.filter(Boolean),
  }
}

export const findFavorite = query({
  args: { slug: v.string() },
  handler: (ctx, args) => _findFavorite(ctx, args.slug),
})

export const getFavorite = query({
  args: { slug: v.string() },
  handler: (ctx, args) =>
    _findFavorite(ctx, args.slug).then(
      ensureFP(`Favorite not found: ${args.slug}`)
    ),
})

export const listFavoriteSlugs = query({
  handler: async (ctx) => {
    const favorites = await ctx.db.query('favorites').collect()
    return favorites.map((f) => f.slug)
  },
})

export const findMostRecentFavorite = query({
  handler: async (ctx) => {
    const favorites = await ctx.db
      .query('favorites')
      .withIndex('by_publishing_date')
      .order('desc')
      .first()

    return favorites
      ? { publishingDate: favorites.publishingDate }
      : null
  },
})

export const listFavoriteMovies = query({
  handler: async (ctx) => {
    const allMtf = await ctx.db.query('moviesToFavorites').collect()

    return await Promise.all(
      allMtf.map(async (mtf) => {
        const movie = await ctx.db.get(mtf.movieId)
        return movie
          ? {
              movieId: mtf.movieId,
              favoriteId: mtf.favoriteId,
              movie: {
                _id: movie._id,
                name: movie.name,
                slug: movie.slug,
                posterUrl: movie.posterUrl,
                director: movie.director,
                releaseDate: movie.releaseDate,
              },
            }
          : null
      })
    ).then((results) => results.filter(Boolean))
  },
})
