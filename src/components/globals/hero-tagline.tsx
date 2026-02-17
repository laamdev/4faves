import { cn } from '@/lib/utils'

export const HeroTagline = ({
  tagline,
  className
}: {
  tagline: string
  className?: string
}) => {
  return (
    <h2
      className={cn(
        'text-primary text-xs font-black tracking-wider uppercase sm:text-sm',
        className
      )}
    >
      {tagline}
    </h2>
  )
}
