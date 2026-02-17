'use client'

import Link from 'next/link'
import { usePreloadedQuery } from 'convex/react'
import type { Preloaded } from 'convex/react'

import { FeaturedCarousel } from '@/components/favorites/featured-carousel'
import { SectionHeading } from '@/components/globals/section-heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

import { api } from '../../../convex/_generated/api'
import { getFormattedDate } from '@/lib/utils'

type LastUpdatedPreloaded = Preloaded<typeof api.favorites.getMostRecentFavorite>
type FeaturedPreloaded = Preloaded<typeof api.featured.getNewDirectors>

function transformFeaturedForCarousel(
  items: Array<{
    _id: string
    name: string
    slug: string
    artists: Array<{
      _id: string
      name: string
      role: string
      headshotUrl?: string | null
      slug: string
    }>
  }>
) {
  return items.map(item => ({
    id: item._id,
    name: item.name,
    slug: item.slug,
    artistsToFavorites: (item.artists ?? []).map(artist => ({
      artist: {
        id: artist._id,
        name: artist.name,
        role: artist.role,
        headshotUrl: artist.headshotUrl ?? null,
      }
    }))
  }))
}

interface HomeClientProps {
  preloadedLastUpdated: LastUpdatedPreloaded
  preloadedNewDirectors: FeaturedPreloaded
  preloadedOldDirectors: FeaturedPreloaded
  preloadedNewStars: FeaturedPreloaded
  preloadedOldStars: FeaturedPreloaded
}

export function HomeClient({
  preloadedLastUpdated,
  preloadedNewDirectors,
  preloadedOldDirectors,
  preloadedNewStars,
  preloadedOldStars
}: HomeClientProps) {
  const lastUpdated = usePreloadedQuery(preloadedLastUpdated)
  const newDirectors = usePreloadedQuery(preloadedNewDirectors)
  const oldDirectors = usePreloadedQuery(preloadedOldDirectors)
  const newStars = usePreloadedQuery(preloadedNewStars)
  const oldStars = usePreloadedQuery(preloadedOldStars)

  const lastUpdatedDate = lastUpdated?.publishingDate
    ? getFormattedDate(lastUpdated.publishingDate)
    : null

  const transformedOldDirectors = oldDirectors
    ? transformFeaturedForCarousel(oldDirectors)
    : []
  const transformedNewDirectors = newDirectors
    ? transformFeaturedForCarousel(newDirectors)
    : []
  const transformedOldStars = oldStars
    ? transformFeaturedForCarousel(oldStars)
    : []
  const transformedNewStars = newStars
    ? transformFeaturedForCarousel(newStars)
    : []

  return (
    <div>
      <Hero
        title='Four Favorites'
        summary={
          <>
            <div className='flex flex-wrap items-baseline justify-center gap-x-1 text-center'>
              <p>{"An ever-growing collection of Letterboxd's"}</p>
              <a
                href='https://www.youtube.com/playlist?list=PL5aexARLijfUCryhTPUxTlCo5MIkwqTBA'
                target='_blank'
                rel='noopener noreferrer'
                className='tw-animation text-primary'
              >
                {"#fourfavorites"}
              </a>
              <p>{" picks by celebrities."}</p>
            </div>
            <div className='mt-1 sm:mt-2'>
              <p>{"Last updated on " + lastUpdatedDate}</p>
            </div>
          </>
        }
        isCentered
      />

      {transformedOldDirectors.length > 0 && (
        <SectionContainer>
          <div className='container'>
            <SectionHeading text='Legendary Lenses' />
            <FeaturedCarousel
              data={{
                oldDirectors: transformedOldDirectors
              }}
            />
            <div className='mt-4 flex items-center justify-center sm:mt-8'>
              <Link href='/lists'>
                <Button variant='default'>All Lists</Button>
              </Link>
            </div>
          </div>
        </SectionContainer>
      )}

      {transformedNewDirectors.length > 0 && (
        <SectionContainer className='bg-neutral-200'>
          <div className='container'>
            <SectionHeading text='Modern Masters' />
            <FeaturedCarousel
              data={{
                newDirectors: transformedNewDirectors
              }}
            />
            <div className='mt-4 flex items-center justify-center sm:mt-8'>
              <Link href='/lists'>
                <Button variant='default'>All Lists</Button>
              </Link>
            </div>
          </div>
        </SectionContainer>
      )}

      {transformedOldStars.length > 0 && (
        <SectionContainer>
          <div className='container'>
            <SectionHeading text='Hollywood Royalty' />
            <FeaturedCarousel
              data={{
                oldStars: transformedOldStars
              }}
            />
            <div className='mt-4 flex items-center justify-center sm:mt-8'>
              <Link href='/lists'>
                <Button variant='default'>All Lists</Button>
              </Link>
            </div>
          </div>
        </SectionContainer>
      )}

      {transformedNewStars.length > 0 && (
        <SectionContainer className='bg-neutral-200'>
          <div className='container'>
            <SectionHeading text='The New Guard' />
            <FeaturedCarousel
              data={{
                newStars: transformedNewStars
              }}
            />
            <div className='mt-4 flex items-center justify-center sm:mt-8'>
              <Link href='/lists'>
                <Button variant='default'>All Lists</Button>
              </Link>
            </div>
          </div>
        </SectionContainer>
      )}

      <SectionContainer className='bg-neutral-800'>
        <div className='container'>
          <SectionHeading
            text='Are We Missing a List?'
            className='text-center text-white'
          />
          <div className='mt-2 flex flex-col items-center gap-y-6 text-center sm:mt-4'>
            <p className='max-w-2xl text-neutral-300'>
              If you've found a Four Favorites list that's not on our website,
              or noticed any errors, please let us know. We're always looking to
              expand our collection.
            </p>
            <a
              className={buttonVariants({
                variant: 'outline',
                className: 'group'
              })}
              href='mailto:hello@laam.dev'
            >
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
