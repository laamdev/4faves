import Link from 'next/link'
import Image from 'next/image'

import { badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { MovieStats } from '@/components/movies/movie-stats'
import { HeroTitle } from '@/components/globals/hero-title'
import { HeroTagline } from '@/components/globals/hero-tagline'
import { HeroSummary } from '@/components/globals/hero-summary'
import { SocialShare } from '@/components/globals/social-share'
import { PageBreadcrumb } from '@/components/globals/page-breadcrumb'

import { getCountryNameFromCode } from '@/lib/utils'
import { getYear } from '@/lib/utils'
import { movieGenres } from '@/data/movie-genres'

interface MovieHeroProps {
  movie: {
    name: string
    director: string
    overview: string
    genres: string[] | null
    slug: string
    posterUrl: string | null
    releaseDate: string
    country: string
    rank: number
    listCount: number
    letterboxdUrl: string | null
  }
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  return (
    <div className='container py-2 sm:py-28'>
      <PageBreadcrumb />

      <div className='mt-16 grid flex-col sm:grid-cols-3'>
        <div className='mt-8 sm:col-span-2 sm:mt-0'>
          <HeroTagline tagline={movie.director} />

          <div className='mt-4'>
            <HeroTitle title={movie.name} />

            <HeroSummary className='mt-4 max-w-xl text-base text-neutral-500 sm:mt-8 sm:text-lg'>
              {movie.overview}
            </HeroSummary>

            <div className='mt-4 flex flex-wrap gap-2 sm:mt-8 sm:gap-4'>
              {(movie.genres ?? []).map((genreId, idx) => {
                const genre = movieGenres.find(
                  genre => genre.id === Number(genreId)
                )
                return (
                  <Link
                    key={idx}
                    href={`/movies?genre=${genreId}`}
                    className={badgeVariants({
                      className: 'capitalize'
                    })}
                  >
                    {genre?.name}
                  </Link>
                )
              })}
            </div>

            <MovieStats
              releaseYear={getYear(movie.releaseDate)}
              director={movie.director}
              country={getCountryNameFromCode(movie.country) || 'Unknown'}
              favoritesCount={movie.listCount}
              rank={movie.rank}
            />

            <div className='mt-16 sm:mt-8 sm:hidden'>
              <div className='flex flex-col gap-4'>
                <Link
                  href={
                    movie.letterboxdUrl ||
                    `https://letterboxd.com/film/${movie.slug}`
                  }
                  className={buttonVariants({ className: 'w-full' })}
                >
                  See on Letterboxd
                </Link>
                <Link
                  href={`https://letterboxd.com/director/${movie.director.toLowerCase().replace(/ /g, '-')}`}
                  className={buttonVariants({
                    variant: 'secondary',
                    className: 'w-full'
                  })}
                >
                  See Director's Films
                </Link>
              </div>
              <div className='mt-8'>
                <SocialShare />
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-1 row-start-1 sm:row-start-auto'>
          <div className='aspect-2/3 relative w-auto'>
            <Image
              src={`https://image.tmdb.org/t/p/w780${movie.posterUrl}`}
              alt={movie.name}
              fill
              sizes='(max-width: 640px) 100vw, 33vw'
              className='tw-gradient border object-cover object-center'
            />
          </div>
          <div className='bg-card hidden flex-col gap-8 p-8 sm:flex'>
            <div className='flex flex-col gap-4'>
              <Link
                href={
                  movie.letterboxdUrl ||
                  `https://letterboxd.com/film/${movie.slug}`
                }
                className={buttonVariants({ className: 'w-full' })}
              >
                See on Letterboxd
              </Link>
              <Link
                href={`https://letterboxd.com/director/${movie.director.toLowerCase().replace(/ /g, '-')}`}
                className={buttonVariants({
                  variant: 'secondary',
                  className: 'w-full'
                })}
              >
                See Director's Films
              </Link>
            </div>

            <SocialShare />
          </div>
        </div>
      </div>
    </div>
  )
}
