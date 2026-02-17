import Link from 'next/link'
import { FilmReel } from '@phosphor-icons/react/dist/ssr'

import { Menu } from '@/components/navigation/menu'
// // import { ThemeToggle } from '@/components/globals/theme-toggle'

export const Header = () => {
  return (
    <div className='absolute inset-x-0 top-0 z-50 container flex items-center justify-between py-4 sm:py-8'>
      <Link href='/'>
        <FilmReel
          weight='fill'
          className='tw-animation hover:text-primary size-7'
        />
      </Link>
      <div className='flex items-center gap-x-4'>
        <Menu />
        {/* <ThemeToggle /> */}
      </div>
    </div>
  )
}
