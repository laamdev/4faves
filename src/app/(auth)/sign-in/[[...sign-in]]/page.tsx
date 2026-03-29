import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='flex min-h-screen'>
      <div className='relative w-1/2'>
        <Image
          src='/images/sign-in.webp'
          alt='Collage of classic movie posters.'
          fill
          sizes='50vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent' />
        <div className='absolute bottom-8 left-8 z-10'>
          <div className='flex flex-col gap-y-2'>
            <p className='text-2xl font-medium text-white'>
              &ldquo;Everything I learned I learned from the movies.&rdquo;
            </p>
            <p className='text-sm text-white/70'>&mdash; Audrey Hepburn</p>
          </div>
        </div>
      </div>

      <div className='flex w-1/2 items-center justify-center'>
        <SignIn />
      </div>
    </div>
  )
}
