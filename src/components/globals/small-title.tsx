import { cn } from '@/lib/utils'

export const SmallTitle = ({
  text,
  className
}: {
  text: string
  className?: string
}) => {
  return (
    <h3
      className={cn(
        'text-sm font-semibold tracking-wider uppercase',
        className
      )}
    >
      {text}
    </h3>
  )
}
