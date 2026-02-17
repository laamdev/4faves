import { preloadQuery } from 'convex/nextjs'

import { api } from '../../../../../convex/_generated/api'
import { DirectorDetailClient } from './director-detail-client'

interface DirectorPageProps {
  params: Promise<{ directorSlug: string }>
}

export default async function DirectorPage({ params }: DirectorPageProps) {
  const { directorSlug } = await params

  const preloadedDirector = await preloadQuery(api.artists.getDirector, {
    slug: directorSlug
  })

  return <DirectorDetailClient preloadedDirector={preloadedDirector} />
}
