'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { Plus } from '@phosphor-icons/react/dist/ssr'

import { api } from '../../../convex/_generated/api'

interface AddMovieButtonProps {
  movie: {
    id: number
    title: string
    overview: string
    poster_path: string
    release_date: string
    genre_ids?: (string | number)[]
  }
  position: number
}

export const AddMovieButton = ({ movie, position }: AddMovieButtonProps) => {
  const router = useRouter()
  const addUserMovie = useMutation(api.model.userMovies.addMyMovie)

  return (
    <div className='tw-animation absolute left-4 top-4 z-50'>
      <button
        onClick={async () => {
          try {
            const movieForConvex = {
              id: movie.id,
              title: movie.title,
              overview: movie.overview ?? '',
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              genre_ids: (movie.genre_ids ?? []).map(String)
            }
            const result = await addUserMovie({ movie: movieForConvex, position })
            if (!result.success) {
              toast.error(result.error)
            } else {
              toast.success(
                `Added ${movie.title} as your #${position} favorite.`
              )
              router.push('/profile')
            }
          } catch (error) {
            toast.error('Failed to add movie')
            console.error(error)
          }
        }}
        className='tw-animation bg-primary flex size-10 transform cursor-pointer items-center justify-center rounded-full text-white opacity-0 hover:bg-black hover:text-neutral-200 group-hover:opacity-100'
      >
        <Plus weight='bold' className='size-6' />
      </button>
    </div>
  )
}
