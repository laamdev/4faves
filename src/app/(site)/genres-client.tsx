'use client'

import { usePreloadedQuery } from 'convex/react'
import type { Preloaded } from 'convex/react'

import { SimpleCard } from '@/components/globals/simple-card'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

import { api } from '../../../convex/_generated/api'

type GetAllGenresPreloaded = Preloaded<typeof api.model.artists.listGenres>

interface GenresClientProps {
  preloadedGenres: GetAllGenresPreloaded
}

export function GenresClient({ preloadedGenres }: GenresClientProps) {
  const genres = usePreloadedQuery(preloadedGenres)

  return (
    <div>
      <Hero
        title='Genres'
        summary='Discover all the movie genres featured in the Four Favorites celebrity picks.'
        isCentered
      />

      <SectionContainer>
        <div className='container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {genres.map(genre => (
            <SimpleCard
              key={genre.slug}
              title={genre.name}
              count={genre.movieCount}
              href={`/movies?genre=${genre.id}`}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  )
}
