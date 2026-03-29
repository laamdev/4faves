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
    preloadQuery(api.model.favorites.findMostRecentFavorite),
    preloadQuery(api.model.featured.listNewDirectors),
    preloadQuery(api.model.featured.listOldDirectors),
    preloadQuery(api.model.featured.listNewStars),
    preloadQuery(api.model.featured.listOldStars)
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
