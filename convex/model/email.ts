import { Resend } from '@convex-dev/resend'
import { components } from '../_generated/api'
import { internalMutation } from '../_generated/server'
import { v } from 'convex/values'

const resend = new Resend(components.resend, {
  testMode: process.env.NODE_ENV !== 'production',
})

export const sendWelcomeEmail = internalMutation({
  args: {
    to: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: '4faves <hello@fourfavourites.com>',
      to: args.to,
      subject: 'Welcome to 4faves!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 24px; color: #111;">Welcome to 4faves${args.name ? `, ${args.name}` : ''}!</h1>
          <p style="font-size: 16px; color: #444; line-height: 1.6;">
            We're excited to have you join us. 4faves is a collection of Letterboxd's
            4faves picks by celebrities — and now you can create your own.
          </p>
          <p style="font-size: 16px; color: #444; line-height: 1.6;">
            Head to your profile to select your four favorite movies and start exploring
            lists from actors, directors, and more.
          </p>
          <a href="https://fourfavourites.com/profile"
             style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #111; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px;">
            Go to My Profile
          </a>
          <p style="font-size: 12px; color: #999; margin-top: 32px;">
            &mdash; The 4faves Team
          </p>
        </div>
      `,
    })
  },
})
