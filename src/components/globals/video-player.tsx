'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from '@phosphor-icons/react/dist/ssr'

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

const getYouTubeVideoId = (url: string): string => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : ''
}

export const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnailQuality, setThumbnailQuality] = useState<
    'maxres' | 'hq' | 'mq' | 'sd'
  >('maxres')

  const videoId = getYouTubeVideoId(videoUrl)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}default.jpg`

  const loadVideo = () => {
    setIsPlaying(true)
  }

  const handleThumbnailError = () => {
    // Try next quality level if current one fails
    switch (thumbnailQuality) {
      case 'maxres':
        setThumbnailQuality('hq')
        break
      case 'hq':
        setThumbnailQuality('mq')
        break
      case 'mq':
        setThumbnailQuality('sd')
        break
      default:
        // If all qualities fail, we could set a default placeholder
        break
    }
  }

  return (
    <div className='relative aspect-video w-full max-w-5xl overflow-hidden'>
      {!isPlaying ? (
        <button
          onClick={loadVideo}
          className='group relative h-full w-full focus:outline-hidden'
          aria-label='Play video'
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
            priority={false}
            onError={handleThumbnailError}
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='tw-animation absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 group-hover:bg-black/30'>
            <div className='bg-primary tw-animation rounded-full p-4 group-hover:scale-105'>
              <Play weight='fill' className='size-8 text-white' />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          loading='lazy'
          className='absolute inset-0 h-full w-full border-0'
        />
      )}
    </div>
  )
}
