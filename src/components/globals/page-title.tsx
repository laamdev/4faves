import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PageTitleProps {
  children: ReactNode
  size?: 'default' | 'lg'
  className?: string
}

export const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1 className={cn('font-serif text-7xl font-bold uppercase', className)}>
      {children}
    </h1>
  )
}
