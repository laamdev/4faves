'use client'

import { useQuery } from 'convex/react'

import { PageTitle } from '@/components/globals/page-title'
import { PageSummary } from '@/components/globals/page-summary'
import { EmptyState } from '@/components/globals/empty-state'
import { ItemCard } from '@/components/globals/item-card'
import { getFormattedYear } from '@/lib/utils'

import { api } from '../../../../convex/_generated/api'
import { use } from 'react'

interface UserPageProps {
  params: Promise<{ userId: string }>
}

export default function UserPage({ params }: UserPageProps) {
  const { userId } = use(params)

  const favorites = useQuery(api.model.userMovies.listUserFavorites, { userId })

  if (favorites === undefined) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center'>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='mt-16 mb-12 sm:mt-24'>
      <div>
        <PageTitle className='flex flex-col'>
          <span>4faves</span>
        </PageTitle>
        <PageSummary>
          A curated collection of four all-time favorite films.
        </PageSummary>
      </div>

      {favorites.length === 0 ? (
        <EmptyState title="This user hasn't picked any favorites yet." />
      ) : (
        <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
          {favorites.map((favorite) =>
            favorite.movie ? (
              <ItemCard
                key={favorite.movieId}
                slug={`/movies/${favorite.movie.slug}`}
                heading={favorite.movie.name}
                subheading={getFormattedYear(favorite.movie.releaseDate)}
                image={`https://image.tmdb.org/t/p/w780${favorite.movie.posterUrl}`}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  )
}
