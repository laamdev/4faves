'use client'

import Link from 'next/link'
import { useConvexAuth } from 'convex/react'
import { useAuthActions } from '@convex-dev/auth/react'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'

export const Menu = () => {
  const { isAuthenticated } = useConvexAuth()
  const { signOut } = useAuthActions()

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='cursor-pointer'>Letterboxd</MenubarTrigger>
        <MenubarContent>
          <Link href='/lists'>
            <MenubarItem className='w-full cursor-pointer'>Lists</MenubarItem>
          </Link>
          <Link href='/movies'>
            <MenubarItem className='w-full cursor-pointer'>Movies</MenubarItem>
          </Link>
          <Link href='/directors'>
            <MenubarItem className='w-full cursor-pointer'>
              Directors
            </MenubarItem>
          </Link>
          <Link href='/genres'>
            <MenubarItem className='w-full cursor-pointer'>Genres</MenubarItem>
          </Link>
          <Link href='/stats'>
            <MenubarItem className='w-full cursor-pointer'>Stats</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className='cursor-pointer'>Profile</MenubarTrigger>
        <MenubarContent>
          {!isAuthenticated ? (
            <>
              <Link href='/sign-in'>
                <MenubarItem className='w-full cursor-pointer'>
                  Sign In
                </MenubarItem>
              </Link>
              <Link href='/sign-up'>
                <MenubarItem className='w-full cursor-pointer'>
                  Sign Up
                </MenubarItem>
              </Link>
            </>
          ) : (
            <>
              <Link href='/profile'>
                <MenubarItem className='w-full cursor-pointer'>
                  My Favorites
                </MenubarItem>
              </Link>
              <MenubarItem
                className='w-full cursor-pointer'
                onClick={() => void signOut()}
              >
                Sign Out
              </MenubarItem>
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
