'use client'

import { useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
}

export default function VideoBackground({ src, poster, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force play on mount
    const playVideo = async () => {
      try {
        video.muted = true // Ensure muted for autoplay policy
        await video.play()
      } catch (error) {
        console.log('Autoplay prevented:', error)
      }
    }

    playVideo()

    // Also try to play on user interaction if autoplay was blocked
    const handleInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {})
      }
    }

    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('touchstart', handleInteraction, { once: true })
    document.addEventListener('scroll', handleInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
      document.removeEventListener('scroll', handleInteraction)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className={className}
      // Additional attributes for better compatibility
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
