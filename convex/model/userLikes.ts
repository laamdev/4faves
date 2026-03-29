import { v } from 'convex/values'
import { query, mutation } from '../_generated/server'
import { requireUser } from '../auth'

export const listUserLikedFavorites = query({
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
    ).then((results) => results.filter((r): r is NonNullable<typeof r> => r !== null))
  },
})

export const toggleMyLike = mutation({
  args: {
    favoriteId: v.id('favorites'),
  },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx)
    const userId = user._id

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
