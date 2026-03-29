import { Metadata } from 'next'
import { preloadQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'

import { GenresClient } from '../genres-client'

export const metadata: Metadata = {
  title: 'Genres',
  description:
    'Discover all the movie genres featured in the 4faves celebrity picks.'
}

export default async function GenresPage() {
  const preloadedGenres = await preloadQuery(api.model.artists.listGenres)

  return <GenresClient preloadedGenres={preloadedGenres} />
}
