import { v } from 'convex/values'
import { query } from '../_generated/server'

async function getFeaturedFavorites(
  ctx: any,
  category: 'new_directors' | 'old_directors' | 'new_stars' | 'old_stars'
) {
  const favorites = await ctx.db
    .query('favorites')
    .withIndex('by_featured_category', (q: any) =>
      q.eq('featuredCategory', category)
    )
    .collect()

  favorites.sort((a: any, b: any) => a.name.localeCompare(b.name))

  return await Promise.all(
    favorites.map(async (favorite: any) => {
      const atfs = await ctx.db
        .query('artistsToFavorites')
        .withIndex('by_favorite', (q: any) =>
          q.eq('favoriteId', favorite._id)
        )
        .collect()

      const artists = await Promise.all(
        atfs.map(async (atf: any) => await ctx.db.get(atf.artistId))
      )

      return {
        ...favorite,
        artists: artists.filter(Boolean),
      }
    })
  )
}

export const listNewDirectors = query({
  handler: async (ctx) => {
    return getFeaturedFavorites(ctx, 'new_directors')
  },
})

export const listOldDirectors = query({
  handler: async (ctx) => {
    return getFeaturedFavorites(ctx, 'old_directors')
  },
})

export const listNewStars = query({
  handler: async (ctx) => {
    return getFeaturedFavorites(ctx, 'new_stars')
  },
})

export const listOldStars = query({
  handler: async (ctx) => {
    return getFeaturedFavorites(ctx, 'old_stars')
  },
})
