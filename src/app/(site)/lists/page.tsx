import { Metadata } from 'next'
import { Suspense } from 'react'

import { FiltersSlider } from '@/components/favorites/filters-slider'
import { FavoritesGrid } from '@/components/favorites/favorites-grid'
import { GridSkeleton } from '@/components/globals/grid-skeleton'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

interface FourFavoritesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'Lists',
  description:
    "Discover curated movie lists from the entertainment industry's finest. From actors and directors to composers and writers, explore their Four Favorite picks."
}

export default async function ListsPage({
  searchParams
}: FourFavoritesPageProps) {
  const { role, sort, query, page } = await searchParams

  const currentPage = page ? parseInt(page as string) : 1

  return (
    <div>
      <Hero
        title={`${role ? `${role}s'` : 'All'} Lists`}
        summary={`Discover curated movie lists from the entertainment industry's finest. From actors and directors to composers and writers, explore their Four Favorite picks.`}
        isCentered
      />

      <SectionContainer>
        <div className='container'>
          <div className='flex justify-center sm:justify-end'>
            <FiltersSlider sort={sort as string} role={role as string} />
          </div>
          <div className='mt-4 sm:mt-8'>
            <Suspense fallback={<GridSkeleton />}>
              <FavoritesGrid
                filter={role}
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
