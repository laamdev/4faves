'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { useEffect, useState } from 'react'

export const MovieSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [search, setSearch] = useState(
    searchParams.get('query')?.toString() || ''
  )
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('query', debouncedSearch)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [debouncedSearch, pathname, replace, searchParams])

  return (
    <Input
      placeholder='Search for a movie...'
      value={search}
      onChange={e => setSearch(e.target.value)}
      className='max-w-2xl'
    />
  )
}
