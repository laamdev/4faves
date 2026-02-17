import { cn } from '@/lib/utils'
import { getOrdinalSuffix } from '@/lib/utils'

import { SmallTitle } from '@/components/globals/small-title'

interface StatItemProps {
  label: string
  value: string | number
}

const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <div className='flex items-baseline justify-between gap-4'>
      <p className='text-muted-foreground shrink-0 text-sm font-medium tracking-wide'>
        {label}
      </p>
      <div className='h-0 grow border-b border-dotted border-current opacity-50' />
      <p className='text-foreground shrink-0 text-right font-serif'>{value}</p>
    </div>
  )
}

interface MovieStatsProps {
  releaseYear: string
  director: string
  country: string
  favoritesCount: number
  rank: number
  className?: string
}

export const MovieStats = ({
  releaseYear,
  director,
  country,
  favoritesCount,
  rank,
  className
}: MovieStatsProps) => {
  return (
    <div className={cn('mt-16 max-w-xl', className)}>
      <div>
        <SmallTitle text='Details' />
        <div className='mt-8 flex flex-col space-y-4 border-t-2 border-black pt-8'>
          <StatItem label='Release Date' value={releaseYear} />
          <StatItem label='Director' value={director} />
          <StatItem label='Country' value={country} />
        </div>
      </div>

      <div className='mt-16 mb-8'>
        <SmallTitle text='Stats' />
        <div className='mt-8 flex flex-col space-y-4 border-t-2 border-black pt-8'>
          <StatItem label='Rank Position' value={getOrdinalSuffix(rank)} />
          <StatItem label='Number of Lists' value={favoritesCount} />
        </div>
      </div>
    </div>
  )
}
