import Link from 'next/link'
import Image from 'next/image'

interface ItemCardProps {
  slug: string
  heading: string
  subheading?: string
  image: string
}

export const ItemCard = ({
  slug,
  heading,
  subheading,
  image
}: ItemCardProps) => {
  return (
    <Link
      href={slug}
      className='group block transform transition-transform duration-300 ease-out hover:-translate-y-2'
    >
      <div className='tw-animation aspect-2/3 relative overflow-hidden'>
        <Image
          src={image}
          alt={heading}
          fill
          className='bg-card tw-animation relative border object-cover object-center'
        />
      </div>
      <div className='mt-2'>
        <h2 className='group-hover:text-primary tw-animation font-serif text-base font-bold tracking-wider sm:text-lg'>
          {heading}
        </h2>
        <p className='text-xs capitalize italic tracking-wide text-neutral-500 sm:text-sm'>
          {subheading}
        </p>
      </div>
    </Link>
  )
}
