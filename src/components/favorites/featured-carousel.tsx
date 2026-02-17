'use client'

import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ItemCard } from '@/components/globals/item-card'

import { cn } from '@/lib/utils'

type Artist = {
  id: number | string
  name: string
  headshotUrl: string | null
  role:
    | 'director'
    | 'actor'
    | 'producer'
    | 'writer'
    | 'composer'
    | 'costume'
    | 'musician'
    | 'cinematographer'
    | 'fictional'
    | 'critic'
}

type FeaturedFavorite = {
  id: number | string
  name: string
  slug: string
  artistsToFavorites: Array<{
    artist: Artist
  }>
}

export function FeaturedCarousel({
  data
}: {
  data: {
    featuredFavorites?: FeaturedFavorite[]
    legendaryDirectors?: Array<{
      id: number | string
      name: string
      slug: string
      artistsToFavorites: Array<{
        artist: Artist
      }>
    }>
    oscarWinners?: Array<{
      id: number | string
      name: string
      slug: string
      artistsToFavorites: Array<{
        artist: Artist
      }>
    }>
    newStars?: Array<{
      id: number | string
      name: string
      slug: string
      artistsToFavorites: Array<{
        artist: Artist
      }>
    }>
    oldStars?: Array<{
      id: number | string
      name: string
      slug: string
      artistsToFavorites: Array<{
        artist: Artist
      }>
    }>
    newDirectors?: Array<{
      id: number | string
      name: string
      slug: string
      artistsToFavorites: Array<{
        artist: Artist
      }>
    }>
    oldDirectors?: Array<{
      id: number | string
      name: string
      slug: string
      artistsToFavorites: Array<{
        artist: Artist
      }>
    }>
  }
}) {
  const itemsToShow =
    data.legendaryDirectors ||
    data.oscarWinners ||
    data.newStars ||
    data.oldStars ||
    data.newDirectors ||
    data.oldDirectors ||
    data.featuredFavorites ||
    []

  return (
    <div className='relative'>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
      >
        <CarouselContent className='mt-4 sm:mt-8'>
          {itemsToShow.map((item: FeaturedFavorite) => {
            const firstArtist = item.artistsToFavorites?.[0]?.artist
            const headshotUrl = firstArtist?.headshotUrl
            const imageUrl = headshotUrl?.includes('cloudinary')
              ? headshotUrl
              : headshotUrl
                ? `https://image.tmdb.org/t/p/h632${headshotUrl}`
                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'

            return (
              <CarouselItem
                key={item.id}
                className='basis-1/2 pl-4 md:basis-1/2 lg:basis-1/5'
              >
                <ItemCard
                  slug={`/lists/${item.slug}`}
                  heading={item.name}
                  subheading={firstArtist?.role || 'Director'}
                  image={imageUrl}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div
          className={cn(
            'mt-4 flex justify-center gap-4 sm:mt-0 sm:block',
            itemsToShow.length <= 5 && 'sm:hidden'
          )}
        >
          <CarouselPrevious className='static translate-y-0 sm:absolute' />
          <CarouselNext className='static translate-y-0 sm:absolute' />
        </div>
      </Carousel>
    </div>
  )
}
