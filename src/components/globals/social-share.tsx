import {
  Envelope,
  FacebookLogo,
  InstagramLogo,
  LinkSimple,
  XLogo
} from '@phosphor-icons/react/dist/ssr'

import { SmallTitle } from '@/components/globals/small-title'

export const SocialShare = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <SmallTitle text='Share' />
      <div className='flex items-center justify-center gap-4'>
        <a
          href='https://x.com/fourfavorites'
          target='_blank'
          rel='noopener noreferrer'
          className='group'
        >
          <XLogo
            weight='fill'
            className='text-primary tw-animation size-6 group-hover:fill-black'
          />
        </a>
        <a
          href='https://www.instagram.com/fourfavorites'
          target='_blank'
          rel='noopener noreferrer'
          className='group'
        >
          <InstagramLogo
            weight='fill'
            className='text-primary tw-animation size-6 group-hover:fill-black'
          />
        </a>
        <a
          href='https://www.facebook.com/fourfavorites'
          target='_blank'
          rel='noopener noreferrer'
          className='group'
        >
          <FacebookLogo
            weight='fill'
            className='text-primary tw-animation size-6 group-hover:fill-black'
          />
        </a>
        <a
          href='mailto:hello@laam.dev'
          target='_blank'
          rel='noopener noreferrer'
          className='group'
        >
          <Envelope
            weight='fill'
            className='text-primary tw-animation size-6 group-hover:fill-black'
          />
        </a>
        <a
          href='https://www.facebook.com/fourfavorites'
          target='_blank'
          rel='noopener noreferrer'
          className='group'
        >
          <LinkSimple
            weight='bold'
            className='text-primary tw-animation size-6 group-hover:fill-black'
          />
        </a>
      </div>
    </div>
  )
}
