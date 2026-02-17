'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { List, SquaresFour } from '@phosphor-icons/react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const ViewToggleGroup = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const view = searchParams.get('view')

  const handleView = (view: string) => {
    const params = new URLSearchParams(searchParams)
    if (view) {
      params.set('view', view)
    } else {
      params.delete('view')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <ToggleGroup type="single" defaultValue={`${view}`}>
      <ToggleGroupItem
        value="grid"
        aria-label="Toggle grid"
        onClick={() => {
          handleView('grid')
        }}
      >
        <SquaresFour weight="fill" className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        aria-label="Toggle list"
        onClick={() => {
          handleView('list')
        }}
      >
        <List weight="fill" className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
