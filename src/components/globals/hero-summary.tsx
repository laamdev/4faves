import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface HeroSummaryProps {
  className?: string
  children: ReactNode
}

export const HeroSummary = ({ children, className }: HeroSummaryProps) => {
  return (
    <div
      className={cn('mt-2 max-w-xl text-sm sm:mt-4 sm:text-base', className)}
    >
      {children}
    </div>
  )
}
