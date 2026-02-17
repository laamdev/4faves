'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { Heart } from '@phosphor-icons/react/dist/ssr'

import { api } from '../../../convex/_generated/api'
import { type Id } from '../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  favoriteId: Id<'favorites'>
  isAuthenticated: boolean
  likes: number
  likedByUser?: boolean
}

export const LikeButton = ({
  favoriteId,
  isAuthenticated,
  likes: initialLikes,
  likedByUser = false
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(likedByUser)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [isLoading, setIsLoading] = useState(false)
  const likeFavorite = useMutation(api.userLikes.likeFavorite)

  const handleLike = async () => {
    try {
      setIsLoading(true)
      const newIsLiked = !isLiked
      const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1

      setIsLiked(newIsLiked)
      setLikesCount(newLikesCount)

      const result = await likeFavorite({ favoriteId })

      if (result.likes !== newLikesCount) {
        setLikesCount(result.likes)
      }
      setIsLiked(result.liked)
    } catch (error) {
      setIsLiked(isLiked)
      setLikesCount(likesCount)
      console.error('Failed to update like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={!isAuthenticated || isLoading}
      className={cn(
        'group flex w-14 cursor-pointer flex-col items-center gap-y-1 disabled:pointer-events-none disabled:opacity-50'
      )}
    >
      <Heart
        weight='fill'
        className={cn(
          'tw-animation size-6 group-hover:fill-neutral-300 sm:size-8',
          {
            'fill-neutral-300': !isLiked,
            'fill-primary': isLiked
          }
        )}
      />
      <span className='text-[10px] font-medium uppercase tabular-nums tracking-wider sm:text-xs'>
        {likesCount} {likesCount !== 1 ? 'Likes' : 'Like'}
      </span>
    </button>
  )
}
