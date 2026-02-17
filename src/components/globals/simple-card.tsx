import Link from 'next/link'

export const SimpleCard = ({
  title,
  count,
  href
}: {
  title: string
  count: number
  href: string
}) => {
  return (
    <Link
      href={href}
      className='group bg-card hover:border-primary tw-animation border p-4'
    >
      <h3 className='text-card-foreground group-hover:text-primary tw-animation font-serif text-lg font-medium'>
        {title}
      </h3>
      <p className='text-muted-foreground mt-1 text-sm'>
        {count} {count === 1 ? 'movie' : 'movies'}
      </p>
    </Link>
  )
}
