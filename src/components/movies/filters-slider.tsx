import { SlidersHorizontal } from '@phosphor-icons/react/dist/ssr'

import { Label } from '@/components/ui/label'
import { Search } from '@/components/favorites/search'
import { FiltersRadio } from '@/components/movies/filters-radio'
import { SortSelect } from '@/components/movies/sort-select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { SmallTitle } from '@/components/globals/small-title'

interface FiltersSliderProps {
  sort: string
  genre: string
}

export const FiltersSlider = ({ sort, genre }: FiltersSliderProps) => {
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
          <SheetTitle>Movies Filters</SheetTitle>
          <SheetDescription>{`Filter, search, and sort movies.`}</SheetDescription>
        </SheetHeader>

        <div className='mt-8 flex max-h-[calc(100vh-8rem)] flex-col gap-y-8 overflow-y-auto'>
          <div className='flex flex-col gap-y-4'>
            <Label className='text-xs tracking-wider uppercase'>{`Search`}</Label>
            <Search placeholder='Find a movie...' />
          </div>

          <div className='flex flex-col gap-y-4'>
            <Label className='text-xs tracking-wider uppercase'>{`Sort`}</Label>
            <SortSelect sort={sort as string} />
          </div>

          <div className='flex flex-col gap-y-4'>
            <Label className='text-xs tracking-wider uppercase'>{`Genre`}</Label>
            <FiltersRadio selectedGenre={genre as string} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
