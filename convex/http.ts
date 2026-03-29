import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { Resend } from '@convex-dev/resend'
import { components } from './_generated/api'

const resend = new Resend(components.resend, {})

const http = httpRouter()

http.route({
  path: '/resend-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx, req)
  }),
})

export default http
