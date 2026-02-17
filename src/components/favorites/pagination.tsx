'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination'

import { createUrl } from '@/lib/utils'

interface PaginationFavoritesProps {
  page: number
  totalPages: number
  totalDocs: number
}

export function PaginationFavorites({
  page,
  totalPages,
  totalDocs
}: PaginationFavoritesProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const itemsPerPage = 10

  const startIndex = (page - 1) * itemsPerPage + 1
  const endIndex = Math.min(page * itemsPerPage, totalDocs)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return createUrl(pathname, params)
  }

  const generatePagination = () => {
    // Show all pages if total is 7 or less
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Add first page, ellipsis and last 3 pages
    if (page <= 3) {
      return [...Array.from({ length: 5 }, (_, i) => i + 1), '...', totalPages]
    }

    // Add first page, ellipsis, current+-1, ellipsis and last page
    if (page >= totalPages - 2) {
      return [
        1,
        '...',
        ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)
      ]
    }

    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const pages = generatePagination()

  return (
    <div className='flex flex-col items-center gap-2'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={page > 1 ? createPageURL(page - 1) : '#'}
              aria-disabled={page <= 1}
            />
          </PaginationItem>

          {pages.map((pageNumber, i) => (
            <PaginationItem key={i}>
              {pageNumber === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageURL(pageNumber)}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={page < totalPages ? createPageURL(page + 1) : '#'}
              aria-disabled={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <span className='text-xs text-neutral-500 sm:text-sm'>
        Showing {startIndex} to {endIndex} of {totalDocs}
      </span>
    </div>
  )
}
