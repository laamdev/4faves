import { v } from 'convex/values'
import { mutation } from './_generated/server'

/**
 * Migration mutations - used by scripts/migrate-to-convex.ts
 * These can be removed after migration is complete.
 */

export const insertMovie = mutation({
  args: {
    name: v.string(),
    overview: v.string(),
    releaseDate: v.string(),
    posterUrl: v.optional(v.string()),
    slug: v.string(),
    director: v.string(),
    country: v.string(),
    genres: v.optional(v.array(v.string())),
    letterboxdUrl: v.optional(v.string()),
    legacyId: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('movies', args)
  },
})

export const insertArtist = mutation({
  args: {
    name: v.string(),
    role: v.union(
      v.literal('actor'),
      v.literal('director'),
      v.literal('producer'),
      v.literal('writer'),
      v.literal('composer'),
      v.literal('costume'),
      v.literal('musician'),
      v.literal('cinematographer'),
      v.literal('fictional'),
      v.literal('critic')
    ),
    headshotUrl: v.optional(v.string()),
    slug: v.string(),
    legacyId: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('artists', args)
  },
})

export const insertFavorite = mutation({
  args: {
    name: v.string(),
    likes: v.number(),
    publishingDate: v.string(),
    videoUrl: v.string(),
    slug: v.string(),
    category: v.union(
      v.literal('horror'),
      v.literal('family'),
      v.literal('western'),
      v.literal('overall')
    ),
    featuredCategory: v.optional(
      v.union(
        v.literal('oscar_winners'),
        v.literal('old_directors'),
        v.literal('new_directors'),
        v.literal('new_stars'),
        v.literal('old_stars')
      )
    ),
    legacyId: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('favorites', args)
  },
})

export const insertMovieToFavorite = mutation({
  args: {
    movieId: v.id('movies'),
    favoriteId: v.id('favorites'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('moviesToFavorites', args)
  },
})

export const insertArtistToFavorite = mutation({
  args: {
    artistId: v.id('artists'),
    favoriteId: v.id('favorites'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('artistsToFavorites', args)
  },
})

export const insertUserMovie = mutation({
  args: {
    userId: v.string(),
    movieId: v.id('movies'),
    position: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('userMovies', args)
  },
})

export const insertUserLike = mutation({
  args: {
    userId: v.string(),
    favoriteId: v.id('favorites'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('userLikes', args)
  },
})
