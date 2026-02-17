import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import { Id } from './_generated/dataModel'

export const getMovie = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const movie = await ctx.db
      .query('movies')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()

    if (!movie) return null

    const moviesToFavorites = await ctx.db
      .query('moviesToFavorites')
      .withIndex('by_movie', (q) => q.eq('movieId', movie._id))
      .collect()

    const favorites = await Promise.all(
      moviesToFavorites.map(async (mtf) => {
        const favorite = await ctx.db.get(mtf.favoriteId)
        if (!favorite) return null

        const artistsToFavorites = await ctx.db
          .query('artistsToFavorites')
          .withIndex('by_favorite', (q) => q.eq('favoriteId', favorite._id))
          .collect()

        const artists = await Promise.all(
          artistsToFavorites.map(async (atf) => {
            return await ctx.db.get(atf.artistId)
          })
        )

        return {
          ...favorite,
          artists: artists.filter(Boolean),
        }
      })
    )

    const allMovies = await ctx.db.query('movies').collect()
    const movieCounts: { id: Id<'movies'>; name: string; listCount: number }[] =
      []

    for (const m of allMovies) {
      const count = (
        await ctx.db
          .query('moviesToFavorites')
          .withIndex('by_movie', (q) => q.eq('movieId', m._id))
          .collect()
      ).length
      movieCounts.push({ id: m._id, name: m.name, listCount: count })
    }

    movieCounts.sort((a, b) =>
      b.listCount !== a.listCount
        ? b.listCount - a.listCount
        : a.name.localeCompare(b.name)
    )

    let currentRank = 0
    let previousListCount = Number.MAX_SAFE_INTEGER
    let rank = 0
    let listCount = 0

    for (const m of movieCounts) {
      if (m.listCount < previousListCount) {
        currentRank++
      }
      previousListCount = m.listCount

      if (m.id === movie._id) {
        rank = currentRank
        listCount = m.listCount
        break
      }
    }

    return {
      ...movie,
      rank,
      listCount,
      favorites: favorites.filter(Boolean),
    }
  },
})

export const getRankedMovies = query({
  args: {
    filter: v.optional(v.string()),
    sort: v.optional(v.string()),
    query: v.optional(v.string()),
    page: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const itemsPerPage = 10
    const page = args.page ?? 1

    let allMovies = await ctx.db.query('movies').collect()

    if (args.query) {
      const q = args.query.toLowerCase()
      allMovies = allMovies.filter((m) => m.name.toLowerCase().includes(q))
    }

    if (args.filter && args.filter !== 'all') {
      allMovies = allMovies.filter(
        (m) => m.genres && m.genres.includes(args.filter!)
      )
    }

    const moviesWithCounts = await Promise.all(
      allMovies.map(async (movie) => {
        const count = (
          await ctx.db
            .query('moviesToFavorites')
            .withIndex('by_movie', (q) => q.eq('movieId', movie._id))
            .collect()
        ).length
        return { ...movie, list_count: count }
      })
    )

    const sort = args.sort
    if (sort === 'name') {
      moviesWithCounts.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === '-name') {
      moviesWithCounts.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sort === 'release_date') {
      moviesWithCounts.sort(
        (a, b) =>
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      )
    } else if (sort === '-release_date') {
      moviesWithCounts.sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
    } else {
      moviesWithCounts.sort((a, b) =>
        b.list_count !== a.list_count
          ? b.list_count - a.list_count
          : a.name.localeCompare(b.name)
      )
    }

    const totalCount = moviesWithCounts.length
    const paged = moviesWithCounts.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    )

    let currentRank = 1
    let previousCount: number | null = null

    const rankedMovies = paged.map((movie) => {
      if (previousCount !== null && movie.list_count < previousCount) {
        currentRank = currentRank + 1
      }
      previousCount = movie.list_count
      return { ...movie, rank: currentRank }
    })

    return { movies: rankedMovies, totalCount }
  },
})

export const getMoviesByDecade = query({
  handler: async (ctx) => {
    const allMovies = await ctx.db.query('movies').collect()
    const moviesInFavorites = new Set<string>()

    const allMtf = await ctx.db.query('moviesToFavorites').collect()
    for (const mtf of allMtf) {
      moviesInFavorites.add(mtf.movieId)
    }

    const decadeMap = new Map<number, number>()
    for (const movie of allMovies) {
      if (!moviesInFavorites.has(movie._id)) continue
      const year = new Date(movie.releaseDate).getFullYear()
      const decade = Math.floor(year / 10) * 10
      decadeMap.set(decade, (decadeMap.get(decade) ?? 0) + 1)
    }

    return Array.from(decadeMap.entries())
      .map(([decade, count]) => ({ decade, count }))
      .sort((a, b) => a.decade - b.decade)
  },
})

export const getMoviesByDirector = query({
  handler: async (ctx) => {
    const allMovies = await ctx.db.query('movies').collect()
    const moviesInFavorites = new Set<string>()

    const allMtf = await ctx.db.query('moviesToFavorites').collect()
    for (const mtf of allMtf) {
      moviesInFavorites.add(mtf.movieId)
    }

    const directorMap = new Map<string, Set<string>>()
    for (const movie of allMovies) {
      if (!moviesInFavorites.has(movie._id)) continue
      const directors = movie.director.split(',').map((d) => d.trim())
      for (const director of directors) {
        if (!directorMap.has(director)) {
          directorMap.set(director, new Set())
        }
        directorMap.get(director)!.add(movie._id)
      }
    }

    return Array.from(directorMap.entries())
      .map(([director, movieIds]) => ({
        director,
        count: movieIds.size,
      }))
      .sort((a, b) => b.count - a.count)
  },
})

export const getMoviesByGenre = query({
  args: { genreId: v.string() },
  handler: async (ctx, args) => {
    const allMovies = await ctx.db.query('movies').collect()
    const filtered = allMovies.filter(
      (m) => m.genres && m.genres.includes(args.genreId)
    )

    return await Promise.all(
      filtered.map(async (movie) => {
        const mtfs = await ctx.db
          .query('moviesToFavorites')
          .withIndex('by_movie', (q) => q.eq('movieId', movie._id))
          .collect()

        const favorites = await Promise.all(
          mtfs.map(async (mtf) => await ctx.db.get(mtf.favoriteId))
        )

        return {
          ...movie,
          favorites: favorites.filter(Boolean),
        }
      })
    )
  },
})

export const getMoviesSlugs = query({
  handler: async (ctx) => {
    const movies = await ctx.db.query('movies').collect()
    return movies.map((m) => m.slug)
  },
})
