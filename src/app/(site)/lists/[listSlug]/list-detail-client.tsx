'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { usePreloadedQuery, useConvexAuth } from 'convex/react'
import type { Preloaded } from 'convex/react'

import { MovieCarousel } from '@/components/favorites/movie-carousel'
import { EmptyState } from '@/components/globals/empty-state'
import { LikeButton } from '@/components/favorites/like-button'
import { VideoPlayer } from '@/components/globals/video-player'
import { SectionContainer } from '@/components/globals/section-wrapper'
import { getFormattedDate } from '@/lib/utils'

import type { api } from '../../../../../convex/_generated/api'

interface ListDetailClientProps {
  preloadedFavorite: Preloaded<typeof api.favorites.getFavorite>
}

export const ListDetailClient = ({
  preloadedFavorite
}: ListDetailClientProps) => {
  const favorite = usePreloadedQuery(preloadedFavorite)
  const { isAuthenticated } = useConvexAuth()

  if (!favorite) return notFound()

  return (
    <div>
      <div className='bg-card'>
        <div className='container flex flex-col py-36'>
          <div className='mt-4 flex flex-col gap-y-8 sm:flex-row sm:gap-x-8'>
            <div className='aspect-2/3 relative w-48 overflow-hidden'>
              <Image
                src={
                  favorite.artists?.[0]?.headshotUrl?.includes('cloudinary')
                    ? favorite.artists[0].headshotUrl
                    : favorite.artists?.[0]?.headshotUrl
                      ? `https://image.tmdb.org/t/p/h632${favorite.artists[0].headshotUrl}`
                      : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                }
                alt='Lists Hero'
                fill
                className='border object-cover object-center'
              />
            </div>

            <div>
              <Link
                href={`/lists?role=${favorite.artists?.[0]?.role}`}
                className='text-primary text-xs font-black uppercase tracking-wider sm:text-sm'
              >
                {favorite.artists?.[0]?.role}
              </Link>
              <h1 className='mt-4 flex flex-col font-serif text-6xl font-medium capitalize sm:text-7xl'>
                <span>{`${favorite.name}'s`}</span>
                <span className='text-neutral-500'>{`Four ${favorite.category === 'overall' ? 'Favorites' : `${favorite.category} Favorites`}`}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className='relative'>
        <div className='container'>
          <div className='absolute right-4 top-4 sm:right-8 sm:top-8'>
            <LikeButton
              favoriteId={favorite._id}
              isAuthenticated={isAuthenticated}
              likedByUser={favorite.likedByUser}
              likes={favorite.likes}
            />
          </div>
          <div className='container'>
            {favorite.movies && favorite.movies.length > 0 ? (
              <MovieCarousel
                movies={favorite.movies.map((movie) => ({
                  movie: {
                    ...movie,
                    id: movie._id as any,
                  },
                }))}
              />
            ) : (
              <EmptyState title='No movies found.' />
            )}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className='bg-neutral-800'>
        <div className='container flex flex-col items-center justify-center'>
          <VideoPlayer videoUrl={favorite.videoUrl} title={favorite.name} />
          <p className='mt-4 text-sm text-neutral-300'>
            {`Published on ${getFormattedDate(favorite.publishingDate)}`}
          </p>
        </div>
      </SectionContainer>
    </div>
  )
}
