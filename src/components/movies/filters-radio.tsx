'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { movieGenres } from '@/data/movie-genres'

interface FiltersRadioProps {
  selectedGenre: string
}

export const FiltersRadio = ({ selectedGenre }: FiltersRadioProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleGenreChange = (genreId: string) => {
    const params = new URLSearchParams(searchParams)
    if (genreId) {
      if (genreId === 'all') {
        params.delete('genre')
      } else {
        params.set('genre', genreId)
      }
      params.set('page', '1')
    } else {
      params.delete('genre')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <RadioGroup
      defaultValue={selectedGenre ?? 'all'}
      onValueChange={handleGenreChange}
      className='grid grid-cols-2'
    >
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='all' id='all' />
        <Label htmlFor='all'>{`All`}</Label>
      </div>
      {movieGenres.map(genre => (
        <div key={genre.id} className='flex items-center space-x-2'>
          <RadioGroupItem
            value={genre.id.toString()}
            id={genre.id.toString()}
          />
          <Label htmlFor={genre.id.toString()}>{genre.name}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
