import { preloadQuery } from 'convex/nextjs'

import { api } from '../../../../../convex/_generated/api'
import { MovieDetailClient } from './movie-detail-client'

interface MoviePageProps {
  params: Promise<{ movieSlug: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { movieSlug } = await params

  const preloadedMovie = await preloadQuery(api.model.movies.findMovie, {
    slug: movieSlug
  })

  return <MovieDetailClient preloadedMovie={preloadedMovie} />
}
