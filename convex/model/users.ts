import { query, mutation } from '../_generated/server'
import { internal } from '../_generated/api'
import { getCurrentUser } from '../auth'

export const findMe = query({
  handler: async (ctx) => {
    return await getCurrentUser(ctx)
  },
})

export const getOrCreateUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first()

    if (existing) return existing

    const userId = await ctx.db.insert('users', {
      clerkId: identity.subject,
      email: identity.email!,
      name: identity.name ?? undefined,
    })

    await ctx.scheduler.runAfter(0, internal.model.email.sendWelcomeEmail, {
      to: identity.email!,
      name: identity.name ?? '',
    })

    return await ctx.db.get(userId)
  },
})
