import '@/app/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import { ConvexClientProvider } from '@/components/globals/convex-client-provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { SITE } from '@/utils/constants'

const rader = localFont({
  src: [
    {
      path: '../../public/fonts/rader/PPRader-Hairline.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-HairlineItalic.woff2',
      weight: '100',
      style: 'italic'
    },
    {
      path: '../../public/fonts/rader/PPRader-Thin.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-ThinItalic.woff2',
      weight: '200',
      style: 'italic'
    },
    {
      path: '../../public/fonts/rader/PPRader-Extralight.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-ExtralightItalic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../public/fonts/rader/PPRader-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../public/fonts/rader/PPRader-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../public/fonts/rader/PPRader-Semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: '../../public/fonts/rader/PPRader-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/rader/PPRader-BoldItalic.woff2',
      weight: '700',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-rader'
})

const grafier = localFont({
  src: [
    {
      path: '../../public/fonts/grafier/regular-display.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/grafier/medium-display.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/grafier/bold-display.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/grafier/heavy-display.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/fonts/grafier/black-display.woff2',
      weight: '900',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-grafier'
})

const neueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/neue-montreal/thin.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../../public/fonts/neue-montreal/thin-italic.woff2',
      weight: '200',
      style: 'italic'
    },
    {
      path: '../../public/fonts/neue-montreal/light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/neue-montreal/light-italic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../public/fonts/neue-montreal/regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/neue-montreal/medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/neue-montreal/medium-italic.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../public/fonts/neue-montreal/semibold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/neue-montreal/bold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/fonts/neue-montreal/bold-italic.woff2',
      weight: '800',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-neueMontreal'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: SITE.TITLE,
    template: `%s | ${SITE.TITLE}`
  },
  description: SITE.DESCRIPTION,
  openGraph: {
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    url: SITE.URL,
    siteName: SITE.TITLE,
    images: [
      {
        url: `${SITE.URL}/images/og.png`,
        width: 1200,
        height: 630
      }
    ],
    locale: 'es-ES',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: SITE.TITLE,
    site: SITE.TITLE,
    card: 'summary_large_image',
    description: SITE.DESCRIPTION,
    images: [
      {
        url: `${SITE.URL}/images/og.png`,
        alt: `${SITE.TITLE} logo`,
        width: 1200,
        height: 630
      }
    ]
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/apple-icon.png'
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html
          lang='en'
          suppressHydrationWarning
          className={cn(
            'overflow-x-hidden font-sans',
            neueMontreal.variable,
            grafier.variable,
            rader.variable
          )}
        >
          <body className='overflow-x-hidden'>
            <Header />
            <main>{children}</main>
            <Toaster position='bottom-left' />
            <Footer />
            <Analytics />
            <SpeedInsights />
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
