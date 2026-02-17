import Link from 'next/link'
import Image from 'next/image'
import { PageTitle } from '@/components/globals/page-title'

interface HomeCardProps {
  href: string
  imageSrc: string
  title: string
}

export const HomeCard = ({ href, imageSrc, title }: HomeCardProps) => {
  const label = title.split(' ')
  return (
    <Link
      href={href}
      className='group flex flex-col items-center gap-y-10 rounded-3xl bg-card p-10 shadow-lg md:p-12'
    >
      <Image
        src={imageSrc}
        alt={title}
        width={1024}
        height={1024}
        className='tw-animation size-28 group-hover:scale-110 md:size-32'
      />
      <PageTitle className='tw-animation flex flex-col text-center group-hover:text-primary'>
        <span>{label[0]}</span>
        <span>{label[1]}</span>
      </PageTitle>
    </Link>
  )
}
