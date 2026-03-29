import { v } from 'convex/values'
import { QueryCtx, query } from '../_generated/server'
import { ensureFP } from '../ensure'

const movieGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

async function _findDirector(ctx: QueryCtx, slug: string) {
  const directorName = slug.replace(/-/g, ' ').toLowerCase()

  const allMovies = await ctx.db.query('movies').collect()
  const directorMovies = allMovies.filter(
    (m) => m.director.toLowerCase() === directorName
  )

  if (!directorMovies.length) return null

  const moviesWithFavorites = await Promise.all(
    directorMovies.map(async (movie) => {
      const mtfs = await ctx.db
        .query('moviesToFavorites')
        .withIndex('by_movie', (q) => q.eq('movieId', movie._id))
        .collect()

      const favorites = await Promise.all(
        mtfs.map(async (mtf) => await ctx.db.get(mtf.favoriteId))
      )

      return {
        ...movie,
        favoriteCount: mtfs.length,
        favorites: favorites.filter(Boolean),
      }
    })
  )

  moviesWithFavorites.sort((a, b) => b.favoriteCount - a.favoriteCount)

  return {
    name: directorMovies[0].director,
    movies: moviesWithFavorites,
  }
}

export const findDirector = query({
  args: { slug: v.string() },
  handler: (ctx, args) => _findDirector(ctx, args.slug),
})

export const getDirector = query({
  args: { slug: v.string() },
  handler: (ctx, args) =>
    _findDirector(ctx, args.slug).then(
      ensureFP(`Director not found: ${args.slug}`)
    ),
})

export const listDirectors = query({
  args: {
    offset: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const offset = args.offset ?? 0
    const limit = args.limit ?? 20

    const allMovies = await ctx.db.query('movies').collect()
    const allMtf = await ctx.db.query('moviesToFavorites').collect()
    const moviesInFavorites = new Set(allMtf.map((mtf) => mtf.movieId as string))

    const directorsMap = new Map<string, number>()
    for (const movie of allMovies) {
      if (!moviesInFavorites.has(movie._id)) continue
      const directors = movie.director.split(',').map((d) => d.trim())
      for (const director of directors) {
        directorsMap.set(director, (directorsMap.get(director) ?? 0) + 1)
      }
    }

    return Array.from(directorsMap.entries())
      .map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        movieCount: count,
      }))
      .sort((a, b) => b.movieCount - a.movieCount)
      .slice(offset, offset + limit)
  },
})

export const listGenres = query({
  handler: async (ctx) => {
    const allMovies = await ctx.db.query('movies').collect()
    const allMtf = await ctx.db.query('moviesToFavorites').collect()
    const moviesInFavorites = new Set(allMtf.map((mtf) => mtf.movieId as string))

    const genresMap = new Map<number, number>()
    for (const movie of allMovies) {
      if (!moviesInFavorites.has(movie._id)) continue
      if (movie.genres) {
        for (const genreId of movie.genres) {
          const id = Number(genreId)
          genresMap.set(id, (genresMap.get(id) ?? 0) + 1)
        }
      }
    }

    return Array.from(genresMap.entries())
      .map(([id, count]) => {
        const genre = movieGenres.find((g) => g.id === id)
        return {
          id,
          name: genre?.name ?? 'Unknown Genre',
          slug: (genre?.name ?? 'unknown').toLowerCase().replace(/\s+/g, '-'),
          movieCount: count,
        }
      })
      .sort((a, b) => b.movieCount - a.movieCount)
  },
})
