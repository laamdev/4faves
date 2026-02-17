'use client'

import { usePathname } from 'next/navigation'
import { CaretRight } from '@phosphor-icons/react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export const PageBreadcrumb = () => {
  const pathname = usePathname()
  const pathnameParts = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <CaretRight />
        </BreadcrumbSeparator>
        {pathnameParts.slice(0, -1).map((part, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={`/${pathnameParts.slice(0, index + 1).join('/')}`}
                className='capitalize'
              >
                {part}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <CaretRight />
            </BreadcrumbSeparator>
          </>
        ))}
        {pathnameParts.length > 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>
              {pathnameParts[pathnameParts.length - 1].replace(/-/g, ' ')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
