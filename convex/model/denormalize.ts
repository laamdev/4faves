import { v } from 'convex/values'
import { internalMutation, mutation } from '../_generated/server'
import { Id } from '../_generated/dataModel'

export const updateMovieListCount = internalMutation({
  args: { movieId: v.id('movies') },
  handler: async (ctx, args) => {
    const movie = await ctx.db.get(args.movieId)
    if (!movie) return

    const count = (
      await ctx.db
        .query('moviesToFavorites')
        .withIndex('by_movie', (q) => q.eq('movieId', args.movieId))
        .collect()
    ).length

    await ctx.db.patch(args.movieId, { listCount: count })
  },
})

export const recomputeAllListCounts = internalMutation({
  handler: async (ctx) => {
    const allMovies = await ctx.db.query('movies').collect()

    for (const movie of allMovies) {
      const count = (
        await ctx.db
          .query('moviesToFavorites')
          .withIndex('by_movie', (q) => q.eq('movieId', movie._id))
          .collect()
      ).length

      if (movie.listCount !== count) {
        await ctx.db.patch(movie._id, { listCount: count })
      }
    }
  },
})
