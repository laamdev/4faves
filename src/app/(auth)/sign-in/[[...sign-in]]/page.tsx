'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthActions } from '@convex-dev/auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  const { signIn } = useAuthActions()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set('flow', 'signIn')
      await signIn('password', formData)
      router.push('/profile')
    } catch {
      toast.error('Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen'>
      <div className='relative w-1/2'>
        <Image
          src='/images/sign-in.webp'
          alt='Collage of classic movie posters.'
          fill
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
        <div className='w-full max-w-sm space-y-6 px-8'>
          <div className='space-y-2 text-center'>
            <h1 className='font-serif text-3xl font-bold'>Welcome back</h1>
            <p className='text-muted-foreground text-sm'>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='you@example.com'
                required
                autoComplete='email'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='••••••••'
                required
                autoComplete='current-password'
              />
            </div>

            <Button
              type='submit'
              size='lg'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className='text-muted-foreground text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='text-primary font-medium hover:underline'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
