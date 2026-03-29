import { preloadQuery } from 'convex/nextjs'

import { api } from '../../../../../convex/_generated/api'
import { ListDetailClient } from './list-detail-client'

interface FavoritesPageProps {
  params: Promise<{ listSlug: string }>
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { listSlug } = await params

  const preloadedFavorite = await preloadQuery(api.model.favorites.findFavorite, {
    slug: listSlug,
  })

  return <ListDetailClient preloadedFavorite={preloadedFavorite} />
}
