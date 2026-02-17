import { QuestionMark } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

interface HeroCardProps {
  type: 'question' | 'poster'
}

const HeroCard = ({ type }: HeroCardProps) => {
  if (type === 'poster') {
    return (
      <div className='aspect-2/3 bg-linear-to-br from-primary/80 to-primary/20 relative w-[160px] overflow-hidden rounded-xl'>
        <img
          src='https://image.tmdb.org/t/p/w780/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg'
          alt='Movie Poster'
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='bg-linear-to-t absolute inset-0 from-black/80 via-black/20 to-transparent' />
        <div className='absolute inset-0 rounded-xl ring-1 ring-white/10' />
      </div>
    )
  }

  return (
    <div className='aspect-2/3 bg-linear-to-br relative w-[160px] overflow-hidden rounded-xl from-neutral-900/90 to-neutral-900/50'>
      <div className='bg-grid-white/[0.02] absolute inset-0' />
      <div className='flex h-full items-center justify-center'>
        <QuestionMark weight='fill' className='size-14 text-white/80' />
      </div>
      <div className='absolute inset-0 rounded-xl ring-1 ring-white/10' />
    </div>
  )
}

interface CardStackProps {
  side: 'left' | 'right'
}

export const CardStack = ({ side }: CardStackProps) => {
  return (
    <div className='relative w-[280px]'>
      {/* Back question mark cards */}
      <div
        className={cn(
          'absolute',
          side === 'left' ? '-right-4' : '-left-4',
          '-top-4'
        )}
      >
        <HeroCard type='question' />
      </div>
      <div
        className={cn(
          'absolute',
          side === 'left' ? 'right-8' : 'left-8',
          '-top-8'
        )}
      >
        <HeroCard type='question' />
      </div>

      {/* Front cards */}
      <div
        className={cn(
          'absolute',
          side === 'left' ? 'left-0' : 'right-0',
          'top-4 z-20'
        )}
      >
        <HeroCard type='poster' />
      </div>
      <div
        className={cn(
          'absolute',
          side === 'left' ? 'right-4' : 'left-4',
          'top-0 z-10'
        )}
      >
        <HeroCard type='question' />
      </div>
    </div>
  )
}
