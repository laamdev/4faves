'use client'

import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { Eye, Minus } from '@phosphor-icons/react'
import Link from 'next/link'

import { api } from '../../../convex/_generated/api'
import { type Id } from '../../../convex/_generated/dataModel'

interface UserMovieActionButtonsProps {
  movieId: Id<'movies'>
  position: number
  movieSlug?: string
}

export const UserMovieActionButtons = ({
  movieId,
  position,
  movieSlug
}: UserMovieActionButtonsProps) => {
  const deleteUserMovie = useMutation(api.userMovies.deleteUserMovie)

  return (
    <div className='tw-animation absolute top-4 left-4 z-50 flex flex-col gap-y-2'>
      <button
        onClick={async () => {
          await deleteUserMovie({ movieId, position })
          toast.success('Movie deleted')
        }}
        className='tw-animation bg-primary flex size-10 transform cursor-pointer items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-black'
      >
        <Minus className='size-6' />
      </button>
      <Link
        href={`/movies/${movieSlug}`}
        className='tw-animation bg-primary flex size-10 transform cursor-pointer items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-black'
      >
        <Eye className='size-6' />
      </Link>
    </div>
  )
}
