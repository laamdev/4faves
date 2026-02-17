'use client'

import { usePreloadedQuery } from 'convex/react'
import type { Preloaded } from 'convex/react'

import { DecadeRadialChart } from '@/components/charts/decade-radial-chart'
import { DirectorBarChart } from '@/components/charts/director-bar-chart'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

import { api } from '../../../../convex/_generated/api'

type MoviesByDecadePreloaded = Preloaded<typeof api.movies.getMoviesByDecade>
type MoviesByDirectorPreloaded = Preloaded<typeof api.movies.getMoviesByDirector>

interface StatsClientProps {
  preloadedMoviesByDecade: MoviesByDecadePreloaded
  preloadedMoviesByDirector: MoviesByDirectorPreloaded
}

export function StatsClient({
  preloadedMoviesByDecade,
  preloadedMoviesByDirector
}: StatsClientProps) {
  const moviesByDecade = usePreloadedQuery(preloadedMoviesByDecade)
  const moviesByDirector = usePreloadedQuery(preloadedMoviesByDirector)

  return (
    <div>
      <Hero
        title='Stats'
        summary='Visualize stats of the Four Favorites celebrity pick lists.'
        isCentered
      />

      <SectionContainer>
        <div className='container'>
          <div className='grid grid-cols-2 gap-8'>
            <DecadeRadialChart data={moviesByDecade} />
            <DirectorBarChart data={moviesByDirector} />
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
