import { SlidersHorizontal } from '@phosphor-icons/react/dist/ssr'

import { Label } from '@/components/ui/label'
import { Search } from '@/components/favorites/search'
import { FiltersRadio } from '@/components/favorites/filters-radio'
import { SortSelect } from '@/components/favorites/sort-select'
import {
  SheetDescription,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { SmallTitle } from '@/components/globals/small-title'

interface FiltersSliderProps {
  sort: string
  role: string
}

export const FiltersSlider = ({ sort, role }: FiltersSliderProps) => {
  return (
    <Sheet>
      <SheetTrigger className='group flex cursor-pointer items-center justify-center gap-x-2'>
        <SlidersHorizontal
          weight='fill'
          className='group-hover:text-primary tw-animation size-5'
        />
        <SmallTitle
          text='Show filters'
          className='text-[10px] font-medium sm:text-xs'
        />
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle className='font-serif text-lg font-semibold uppercase tracking-wider'>
            Lists Filters
          </SheetTitle>
          <SheetDescription>{`Filter, search, and sort the Four Favorite lists of your favorite artists.`}</SheetDescription>
        </SheetHeader>

        <div className='mt-8 flex max-h-[calc(100vh-8rem)] flex-col gap-y-8 overflow-y-auto'>
          <div className='flex flex-col gap-y-3'>
            <Label className='text-xs uppercase tracking-wider text-neutral-500'>{`Search`}</Label>
            <Search placeholder='Find a list...' />
          </div>

          <div className='flex flex-col gap-y-3'>
            <Label className='text-xs uppercase tracking-wider text-neutral-500'>{`Sort`}</Label>
            <SortSelect sort={sort as string} />
          </div>

          <div className='flex flex-col gap-y-3'>
            <Label className='text-xs uppercase tracking-wider text-neutral-500'>{`Role`}</Label>
            <FiltersRadio role={role as string} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
