import { v } from 'convex/values'
import { QueryCtx, query, mutation } from '../_generated/server'
import { requireUser } from '../auth'
import { ensureFP } from '../ensure'

export const listUserMovies = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const userMovies = await ctx.db
      .query('userMovies')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect()

    userMovies.sort((a, b) => a.position - b.position)

    return await Promise.all(
      userMovies.map(async (um) => {
        const movie = await ctx.db.get(um.movieId)
        return {
          ...um,
          movie: movie
            ? {
                _id: movie._id,
                name: movie.name,
                slug: movie.slug,
                posterUrl: movie.posterUrl,
                releaseDate: movie.releaseDate,
              }
            : null,
        }
      })
    )
  },
})

export const listUserFavorites = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const userMovies = await ctx.db
      .query('userMovies')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect()

    userMovies.sort((a, b) => a.position - b.position)

    return await Promise.all(
      userMovies.map(async (um) => {
        const movie = await ctx.db.get(um.movieId)
        return {
          ...um,
          movie: movie
            ? {
                _id: movie._id,
                name: movie.name,
                slug: movie.slug,
                posterUrl: movie.posterUrl,
                releaseDate: movie.releaseDate,
                director: movie.director,
                overview: movie.overview,
              }
            : null,
        }
      })
    )
  },
})

async function _findMovieAtPosition(ctx: QueryCtx, userId: string, position: number) {
  const existing = await ctx.db
    .query('userMovies')
    .withIndex('by_user_position', (q) =>
      q.eq('userId', userId).eq('position', position)
    )
    .first()

  if (!existing) return null

  const movie = await ctx.db.get(existing.movieId)
  return {
    ...existing,
    movie: movie
      ? {
          _id: movie._id,
          name: movie.name,
          slug: movie.slug,
          posterUrl: movie.posterUrl,
          releaseDate: movie.releaseDate,
        }
      : null,
  }
}

export const findMovieAtPosition = query({
  args: { userId: v.string(), position: v.number() },
  handler: (ctx, args) => _findMovieAtPosition(ctx, args.userId, args.position),
})

export const getMovieAtPosition = query({
  args: { userId: v.string(), position: v.number() },
  handler: (ctx, args) =>
    _findMovieAtPosition(ctx, args.userId, args.position).then(
      ensureFP(`No movie at position ${args.position} for user ${args.userId}`)
    ),
})

export const addMyMovie = mutation({
  args: {
    movie: v.object({
      id: v.number(),
      title: v.string(),
      overview: v.string(),
      poster_path: v.string(),
      release_date: v.string(),
      genre_ids: v.array(v.string()),
    }),
    position: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx)
    const userId = user._id

    if (args.position < 1 || args.position > 4) {
      throw new Error('Position must be between 1 and 4')
    }

    let existingMovie = await ctx.db
      .query('movies')
      .withIndex('by_name', (q) => q.eq('name', args.movie.title))
      .first()

    let movieId = existingMovie?._id

    if (movieId) {
      const existingUserMovie = await ctx.db
        .query('userMovies')
        .withIndex('by_user_movie', (q) =>
          q.eq('userId', userId).eq('movieId', movieId!)
        )
        .first()

      if (existingUserMovie) {
        return { success: false, error: 'Movie already in your favorites' }
      }
    }

    if (!existingMovie) {
      movieId = await ctx.db.insert('movies', {
        name: args.movie.title,
        slug: args.movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        overview: args.movie.overview,
        director: 'N/A',
        posterUrl: args.movie.poster_path,
        releaseDate: new Date(args.movie.release_date).toISOString(),
        genres: args.movie.genre_ids,
        country: 'US',
        legacyId: args.movie.id,
      })
    }

    const existingPosition = await ctx.db
      .query('userMovies')
      .withIndex('by_user_position', (q) =>
        q.eq('userId', userId).eq('position', args.position)
      )
      .first()

    if (existingPosition) {
      await ctx.db.delete(existingPosition._id)
    }

    await ctx.db.insert('userMovies', {
      userId,
      movieId: movieId!,
      position: args.position,
    })

    return { success: true }
  },
})

export const deleteMyMovie = mutation({
  args: {
    movieId: v.id('movies'),
    position: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx)
    const userId = user._id

    const existing = await ctx.db
      .query('userMovies')
      .withIndex('by_user_movie', (q) =>
        q.eq('userId', userId).eq('movieId', args.movieId)
      )
      .first()

    if (existing) {
      await ctx.db.delete(existing._id)
    }

    return { success: true }
  },
})
