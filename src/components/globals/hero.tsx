import { ReactNode } from 'react'
import { HeroSummary } from '@/components/globals/hero-summary'
import { HeroTagline } from '@/components/globals/hero-tagline'
import { HeroTitle } from '@/components/globals/hero-title'

import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  tagline?: string
  summary?: ReactNode
  isCentered?: boolean
}

export const Hero = ({ title, tagline, summary, isCentered }: HeroProps) => {
  return (
    <div className='bg-card py-24 sm:py-36'>
      <div
        className={cn(
          'container flex flex-col',
          isCentered && 'items-center justify-center text-center'
        )}
      >
        {tagline && <HeroTagline tagline={tagline} />}

        <HeroTitle
          title={title}
          className={cn('mt-4', isCentered && 'text-center uppercase')}
        />

        {summary && <HeroSummary>{summary}</HeroSummary>}
      </div>
    </div>
  )
}
