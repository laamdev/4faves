import { Metadata } from 'next'
import Image from 'next/image'

import { PageTitle } from '@/components/globals/page-title'
import { MovieSearch } from '@/components/user/movie-search'
import { AddMovieButton } from '@/components/user/add-movie-button'
import { Hero } from '@/components/globals/hero'
import { SectionContainer } from '@/components/globals/section-wrapper'

import { getFormattedYear } from '@/lib/utils'
import { searchMovies } from '@/utils/tmdb'

interface AddMoviePageProps {
  searchParams: Promise<{ position: string; query: string }>
}

export const metadata: Metadata = {
  title: 'Add Favorite'
}

export default async function AddMoviePage({
  searchParams
}: AddMoviePageProps) {
  const { position, query } = await searchParams

  const movies = query ? await searchMovies(query) : []

  return (
    <>
      <Hero
        title={`Favorite #${Number(position)}`}
        summary='Add a movie to your favorite list.'
      />

      <SectionContainer>
        <div className='container'>
          <MovieSearch />

          <ul className='grid grid-cols-5 gap-4 sm:mt-8'>
            {query &&
              movies.length > 0 &&
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className='group block transform transition-transform duration-300 ease-out hover:-translate-y-2'
                >
                  <div className='tw-animation relative aspect-2/3 overflow-hidden'>
                    <Image
                      src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      sizes='(max-width: 640px) 50vw, 20vw'
                      className='bg-card tw-animation relative object-cover object-center'
                    />

                    <div className='tw-animation absolute inset-0 z-50 group-hover:bg-black/50' />
                    <AddMovieButton movie={movie} position={Number(position)} />
                  </div>
                  <div className='mt-2'>
                    <h2 className='group-hover:text-primary tw-animation font-serif text-base font-bold tracking-wider sm:text-lg'>
                      {movie.title}
                    </h2>
                    <p className='text-xs tracking-wide text-neutral-500 capitalize italic sm:text-sm'>
                      {getFormattedYear(movie.release_date)}
                    </p>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </SectionContainer>
    </>
  )
}
