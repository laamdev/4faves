'use client'

import { notFound } from 'next/navigation'
import { usePreloadedQuery } from 'convex/react'
import type { Preloaded } from 'convex/react'

import { EmptyState } from '@/components/globals/empty-state'
import { SectionHeading } from '@/components/globals/section-heading'
import { ItemCard } from '@/components/globals/item-card'
import { MovieHero } from '@/components/movies/movie-hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

import type { api } from '../../../../../convex/_generated/api'

interface MovieDetailClientProps {
  preloadedMovie: Preloaded<typeof api.movies.getMovie>
}

export const MovieDetailClient = ({
  preloadedMovie
}: MovieDetailClientProps) => {
  const movie = usePreloadedQuery(preloadedMovie)

  if (!movie) return notFound()

  return (
    <div>
      <MovieHero movie={movie as any} />

      <SectionContainer className='bg-card'>
        <div className='container'>
          <SectionHeading text='Picked by' />

          {movie.favorites.length > 0 ? (
            <div className='mt-4 grid grid-cols-2 gap-4 sm:mt-8 sm:grid-cols-5'>
              {movie.favorites.map((favorite: any) => (
                <ItemCard
                  key={favorite._id}
                  slug={`/lists/${favorite.slug}`}
                  heading={favorite.name}
                  subheading={favorite.artists?.[0]?.role}
                  image={
                    favorite.artists?.[0]?.headshotUrl?.includes('cloudinary')
                      ? favorite.artists[0].headshotUrl
                      : favorite.artists?.[0]?.headshotUrl
                        ? `https://image.tmdb.org/t/p/h632${favorite.artists[0].headshotUrl}`
                        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                  }
                />
              ))}
            </div>
          ) : (
            <div className='mt-4 sm:mt-8'>
              <EmptyState title='This movie is not included in any lists yet.' />
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  )
}
