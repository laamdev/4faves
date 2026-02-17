'use client'

import { useQuery } from 'convex/react'
import { ItemCard } from '@/components/globals/item-card'
import { PaginationFavorites } from '@/components/favorites/pagination'
import { EmptyState } from '@/components/globals/empty-state'

import { api } from '../../../convex/_generated/api'

interface FavoritesGridProps {
  filter: string | string[] | undefined
  sort: string | string[] | undefined
  query: string | string[] | undefined
  page: number
}

export const FavoritesGrid = ({
  filter,
  sort,
  query,
  page
}: FavoritesGridProps) => {
  const favoritesPerPage = 10

  const result = useQuery(api.favorites.getFavorites, {
    filter: filter as string,
    sort: sort as string,
    query: query as string,
    page: page
  })

  if (result === undefined) {
    return (
      <div className='flex min-h-[200px] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
      </div>
    )
  }

  const { favorites, totalCount } = result
  const totalPages = Math.ceil(totalCount / favoritesPerPage)

  if (favorites.length === 0) {
    return (
      <EmptyState
        title='No lists found!'
        description={
          query
            ? 'Please adjust your search terms or the selected filters.'
            : 'No lists have been created yet.'
        }
      />
    )
  }

  return (
    <div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
        {favorites.map(favorite => {
          return (
            <ItemCard
              key={favorite._id}
              slug={`/lists/${favorite.slug}`}
              heading={favorite.name}
              subheading={favorite.artists?.[0]?.role}
              image={
                favorite.artists?.[0]?.headshotUrl?.includes('cloudinary')
                  ? favorite.artists[0]?.headshotUrl
                  : favorite.artists?.[0]?.headshotUrl
                    ? `https://image.tmdb.org/t/p/h632${favorite.artists[0]?.headshotUrl}`
                    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
              }
            />
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className='mt-4 sm:mt-8'>
          <PaginationFavorites
            page={page}
            totalPages={totalPages}
            totalDocs={totalCount}
          />
        </div>
      )}
    </div>
  )
}
