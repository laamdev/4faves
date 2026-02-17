import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PageSummaryProps {
  children: ReactNode
  className?: string
}

export const PageSummary = ({ children, className }: PageSummaryProps) => {
  return (
    <div
      className={cn(
        'mt-2 max-w-xl text-center sm:mt-4 md:text-base',

        className
      )}
    >
      {children}
    </div>
  )
}
