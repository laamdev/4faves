import { cn } from '@/lib/utils'

export const HeroTitle = ({
  title,
  className
}: {
  title: string
  className?: string
}) => {
  return (
    <h1
      className={cn(
        'flex flex-col font-serif text-5xl font-bold capitalize sm:text-7xl',
        className
      )}
    >
      {title}
    </h1>
  )
}
