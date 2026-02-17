import { Metadata } from 'next'
import { Suspense } from 'react'

import { FiltersSlider } from '@/components/movies/filters-slider'
import { GridSkeleton } from '@/components/globals/grid-skeleton'
import { MoviesGrid } from '@/components/movies/movies-grid'

import { movieGenres } from '@/data/movie-genres'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

interface MoviesPageProps {
  searchParams: Promise<{
    genre: string
    sort: string
    query: string
    page: string
    view: string
  }>
}

export const generateMetadata = async ({
  searchParams
}: MoviesPageProps): Promise<Metadata> => {
  const { genre } = await searchParams
  const genreName = genre
    ? movieGenres.find(g => g.id === Number(genre))?.name
    : null

  return {
    title: genreName ? `${genreName} Movies` : 'Movies',
    description: genreName
      ? `A list of ${genreName.toLowerCase()} movies from Four Favorites celebrity picks.`
      : 'A list of all the movies present in a Four Favorites celebrity pick.'
  }
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const { sort, genre, page, query } = await searchParams
  const currentPage = page ? parseInt(page as string) : 1

  const genreName = genre
    ? movieGenres.find(g => g.id === Number(genre))?.name
    : null

  return (
    <div>
      <Hero
        title={`${genreName ?? 'All'} Movies`}
        summary={`Discover all the movies featured in the the Four Favorites celebrity picks.`}
        isCentered
      />

      <SectionContainer>
        <div className='container'>
          <div className='flex justify-center sm:justify-end'>
            <FiltersSlider sort={sort as string} genre={genre as string} />
          </div>

          <div className='mt-8'>
            <Suspense fallback={<GridSkeleton />}>
              <MoviesGrid
                filter={genre}
                sort={sort}
                query={query}
                page={currentPage}
              />
            </Suspense>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
