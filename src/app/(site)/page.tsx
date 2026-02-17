import { preloadQuery } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'

import { HomeClient } from './home-client'

export default async function FourFavoritesPage() {
  const [
    preloadedLastUpdated,
    preloadedNewDirectors,
    preloadedOldDirectors,
    preloadedNewStars,
    preloadedOldStars
  ] = await Promise.all([
    preloadQuery(api.favorites.getMostRecentFavorite),
    preloadQuery(api.featured.getNewDirectors),
    preloadQuery(api.featured.getOldDirectors),
    preloadQuery(api.featured.getNewStars),
    preloadQuery(api.featured.getOldStars)
  ])

  return (
    <HomeClient
      preloadedLastUpdated={preloadedLastUpdated}
      preloadedNewDirectors={preloadedNewDirectors}
      preloadedOldDirectors={preloadedOldDirectors}
      preloadedNewStars={preloadedNewStars}
      preloadedOldStars={preloadedOldStars}
    />
  )
}
