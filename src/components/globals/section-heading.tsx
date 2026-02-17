import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  text: string
  className?: string
}

export const SectionHeading = ({ text, className }: SectionHeadingProps) => {
  return (
    <h2
      className={cn('text-center font-serif text-2xl sm:text-5xl', className)}
    >
      {text}
    </h2>
  )
}
