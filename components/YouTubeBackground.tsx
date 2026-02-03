'use client'

import { useEffect, useState } from 'react'

interface YouTubeBackgroundProps {
  videoId: string
  className?: string
}

export default function YouTubeBackground({ videoId, className = '' }: YouTubeBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay iframe load slightly for better LCP
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${className} overflow-hidden`}>
      {/* Poster image for instant display */}
      <div
        className="absolute inset-0 bg-primary"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* YouTube iframe - loads after initial paint */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            title="Video background"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute w-[177.78vh] h-[100vh] min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              border: 'none',
              aspectRatio: '16/9',
            }}
          />
        </div>
      )}
    </div>
  )
}
