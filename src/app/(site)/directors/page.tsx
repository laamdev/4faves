'use client'

import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'convex/react'

import { SimpleCard } from '@/components/globals/simple-card'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

import { api } from '../../../../convex/_generated/api'

export default function DirectorsPage() {
  const [limit, setLimit] = useState(20)
  const observerRef = useRef<IntersectionObserver>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const directors = useQuery(api.model.artists.listDirectors, {
    offset: 0,
    limit,
  })

  const isLoading = directors === undefined
  const isReachingEnd = directors && directors.length < limit

  useEffect(() => {
    if (isLoading) return

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isReachingEnd && !isLoading) {
        setLimit((prev) => prev + 20)
      }
    })

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [isLoading, isReachingEnd])

  return (
    <div>
      <Hero
        title='Directors'
        summary={`Discover all the directors featured in the 4faves celebrity picks.`}
        isCentered
      />

      <SectionContainer>
        <div className='container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {(directors ?? []).map((director, index) => (
            <SimpleCard
              key={`${director.slug}-${index}`}
              title={director.name}
              count={director.movieCount}
              href={`/directors/${director.slug}`}
            />
          ))}
        </div>

        <div ref={loadMoreRef} className='mt-8 flex justify-center sm:mt-12'>
          {isLoading && (
            <div className='text-muted-foreground text-sm'>
              Loading more directors...
            </div>
          )}
          {isReachingEnd && (directors ?? []).length > 0 && (
            <div className='text-muted-foreground text-sm'>
              No more directors to load.
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  )
}
