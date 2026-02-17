import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { enGB } from 'date-fns/locale'
import { countries } from '@/data/countries'
import { movieGenres } from '@/data/movie-genres'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getDecadeColor = (decade: number) => {
  return `hsl(${((decade - 1920) / 100) * 360}, 70%, 50%)`
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}

export const getOrdinalSuffix = (n: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = n % 100

  if (value >= 11 && value <= 13) {
    return `${n}th`
  }

  switch (value % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

export const getFormattedDate = (
  date: string,
  dateFormat: string = 'EEEE, MMM d, yyyy'
) => {
  const formattedDate = format(new Date(date), dateFormat, {
    locale: enGB
  })

  return formattedDate
}

export const getFormattedYear = (date: string) => {
  const formattedYear = getYear(date)

  return formattedYear
}

export const getYear = (date: string) => {
  const year = date.split('-')[0]

  return year
}

export const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString()
  return `${pathname}${paramsString ? '?' : ''}${paramsString}`
}

export const getCountryNameFromCode = (code: string): string => {
  const country = countries.find(
    (country: any) => country.code.toLowerCase() === code.toLowerCase()
  )
  return country ? country.name : code
}

export const getGenreNameFromId = (id: number): string => {
  const genre = movieGenres.find(g => g.id === id)
  return genre ? genre.name : 'Unknown Genre'
}
