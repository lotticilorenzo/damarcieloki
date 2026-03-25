'use client'

import React, { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { ImagePlaceholder } from './ImagePlaceholder'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackText?: string
  containerClassName?: string
  aspectRatio?: string
}

export function OptimizedImage({
  src,
  alt,
  fallbackText,
  containerClassName,
  aspectRatio,
  className,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <ImagePlaceholder 
        width={props.width} 
        height={props.height} 
        text={fallbackText} 
        className={containerClassName}
        aspectRatio={aspectRatio}
      />
    )
  }

  return (
    <div className={cn("relative overflow-hidden", aspectRatio, containerClassName)}>
      <Image
        src={src}
        alt={alt}
        className={cn("transition-opacity duration-500", className)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  )
}
