import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
}

export const SectionContainer = ({
  children,
  className
}: SectionContainerProps) => {
  return (
    <section className={cn('py-16 sm:py-28', className)}>{children}</section>
  )
}
