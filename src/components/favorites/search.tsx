'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'

interface SearchProps {
  placeholder: string
  className?: string
}

export const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
      params.set('page', '1')
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Input
      placeholder={placeholder}
      onChange={e => {
        handleSearch(e.target.value)
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}
