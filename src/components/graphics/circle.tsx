import { cn } from '@/lib/utils'

interface CircleProps {
  className?: string
}

export const Circle = ({ className }: CircleProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      fillRule='evenodd'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='1.5'
      clipRule='evenodd'
      viewBox='0 0 776 222'
      className={cn('', className)}
    >
      <path
        fill='none'
        stroke='#B6995D'
        strokeWidth='5.14'
        d='M487.477 448.13c-87.032 48.328-132.299 35.057-202.074 40.299-177.404 13.327-194.31 24.525-203.165 41.706-6.773 13.143-4.654 41.205 31.21 59.137 12.229 6.115 144.631 38.26 357.907 28.018 88.171-4.235 221.126-14.456 290.724-42.7 33.827-13.727 28.265-50.948 0-59.974-69.664-22.246-131.064-22.755-196.237-25.137-127.613-4.665-252.413-3.395-300.096-40.682'
        transform='matrix(1.08578 0 0 1.24301 -81.47 -552.755)'
      />
    </svg>
  )
}
