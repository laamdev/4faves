import { preloadQuery } from 'convex/nextjs'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'

import { api } from '../../../../../convex/_generated/api'
import { ListDetailClient } from './list-detail-client'

interface FavoritesPageProps {
  params: Promise<{ listSlug: string }>
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { listSlug } = await params
  const token = await convexAuthNextjsToken()

  const preloadedFavorite = await preloadQuery(
    api.favorites.getFavorite,
    { slug: listSlug },
    { token }
  )

  return <ListDetailClient preloadedFavorite={preloadedFavorite} />
}
