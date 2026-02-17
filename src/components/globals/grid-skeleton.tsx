import { Skeleton } from '@/components/ui/skeleton'

export const GridSkeleton = () => {
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className='relative flex flex-col gap-2'>
          <Skeleton key={index} className='tw-gradient aspect-2/3' />
          <Skeleton className='tw-gradient h-6 w-1/2 text-base font-bold sm:text-lg' />
        </div>
      ))}
    </div>
  )
}
