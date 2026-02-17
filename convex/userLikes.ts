import { v } from 'convex/values'
import { getAuthUserId } from '@convex-dev/auth/server'
import { query, mutation } from './_generated/server'

export const getUserLikedFavorites = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query('userLikes')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect()

    return await Promise.all(
      likes.map(async (like) => {
        const favorite = await ctx.db.get(like.favoriteId)
        if (!favorite) return null

        const atfs = await ctx.db
          .query('artistsToFavorites')
          .withIndex('by_favorite', (q) =>
            q.eq('favoriteId', favorite._id)
          )
          .collect()

        const artists = await Promise.all(
          atfs.map(async (atf) => {
            const artist = await ctx.db.get(atf.artistId)
            return artist
              ? { headshotUrl: artist.headshotUrl, role: artist.role }
              : null
          })
        )

        return {
          ...like,
          favorite: {
            ...favorite,
            artists: artists.filter(Boolean),
          },
        }
      })
    ).then((results) => results.filter(Boolean))
  },
})

export const likeFavorite = mutation({
  args: {
    favoriteId: v.id('favorites'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Unauthorized')

    const existingLike = await ctx.db
      .query('userLikes')
      .withIndex('by_user_favorite', (q) =>
        q.eq('userId', userId).eq('favoriteId', args.favoriteId)
      )
      .first()

    const favorite = await ctx.db.get(args.favoriteId)
    if (!favorite) throw new Error('Favorite not found')

    if (existingLike) {
      await ctx.db.delete(existingLike._id)
      await ctx.db.patch(args.favoriteId, {
        likes: Math.max(0, favorite.likes - 1),
      })
      return { liked: false, likes: Math.max(0, favorite.likes - 1) }
    }

    await ctx.db.insert('userLikes', {
      userId,
      favoriteId: args.favoriteId,
    })

    await ctx.db.patch(args.favoriteId, {
      likes: favorite.likes + 1,
    })

    return { liked: true, likes: favorite.likes + 1 }
  },
})
