import { R2 } from '@convex-dev/r2'
import { components } from '../_generated/api'
import { DataModel } from '../_generated/dataModel'
import { mutation, query } from '../_generated/server'
import { v } from 'convex/values'
import { requireUser } from '../auth'

const r2 = new R2(components.r2)

const { generateUploadUrl, syncMetadata } = r2.clientApi<DataModel>({
  checkUpload: async (ctx) => {
    await requireUser(ctx)
  },
})

export { generateUploadUrl, syncMetadata }

export const getFileUrl = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await r2.getUrl(args.key)
  },
})

export const deleteMyFile = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    await requireUser(ctx)
    await r2.deleteObject(ctx, args.key)
  },
})

export const updateMyProfileImage = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx)
    const url = await r2.getUrl(args.key)
    await ctx.db.patch(user._id, { profileImageUrl: url })
  },
})
