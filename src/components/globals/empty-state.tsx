import { ReactNode } from 'react'
import { FilmSlate } from '@phosphor-icons/react/dist/ssr'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export const EmptyState = ({
  icon = <FilmSlate weight='fill' className='size-10 text-neutral-700' />,
  title,
  description,
  children,
  className = ''
}: EmptyStateProps) => {
  return (
    <div
      className={`flex min-h-[400px] flex-col items-center justify-center bg-neutral-50 p-10 text-center ${className}`}
    >
      {icon}
      <h3 className='mt-4 text-2xl font-semibold'>{title}</h3>
      {description && (
        <p className='mt-2 max-w-sm text-center text-sm text-neutral-600 sm:text-base'>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
