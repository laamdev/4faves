'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { MovieCard } from '@/components/movies/movie-card'

import { cn, getFormattedYear } from '@/lib/utils'
import { MoviesToFavorites } from '@/types'

interface MovieCarouselProps {
  movies: MoviesToFavorites[]
}

export const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
    >
      <CarouselContent className='mt-2 -ml-4'>
        {movies.map(item => (
          <CarouselItem
            key={item.movie.id}
            className='basis-1/2 pl-4 md:basis-1/2 lg:basis-1/4'
          >
            <MovieCard
              slug={`/movies/${item.movie.slug}`}
              heading={item.movie.name}
              subheading={getFormattedYear(item.movie.releaseDate)}
              image={
                item.movie.posterUrl
                  ? `https://image.tmdb.org/t/p/w780${item.movie.posterUrl}`
                  : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      <div
        className={cn(
          'mt-4 flex justify-center gap-4 sm:mt-0 sm:block',
          movies.length <= 4 && 'sm:hidden'
        )}
      >
        <CarouselPrevious className='static translate-y-0 sm:absolute' />
        <CarouselNext className='static translate-y-0 sm:absolute' />
      </div>
    </Carousel>
  )
}
