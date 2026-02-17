'use client'

import { toast } from 'sonner'
import { Share } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'

export const ShareButton = ({ userId }: { userId: string }) => {
  const handleShare = async () => {
    const url = `${window.location.origin}/users/${userId}`
    await navigator.clipboard.writeText(url)
    toast.success('Link copied!')
  }

  return (
    <Button onClick={handleShare} variant='outline' className='gap-x-2'>
      <Share className='size-4' />
      <span>Share</span>
    </Button>
  )
}
