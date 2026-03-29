import { preloadQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'

import { StatsClient } from '../stats-client'

export default async function StatsPage() {
  const [preloadedMoviesByDecade, preloadedMoviesByDirector] =
    await Promise.all([
      preloadQuery(api.model.movies.listMoviesByDecade),
      preloadQuery(api.model.movies.listMoviesByDirector)
    ])

  return (
    <StatsClient
      preloadedMoviesByDecade={preloadedMoviesByDecade}
      preloadedMoviesByDirector={preloadedMoviesByDirector}
    />
  )
}
