import Image from 'next/image'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof Image> {
  width?: number
  height?: number
  src: string
  alt: string
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ width = 40, height = 40, src, alt = '', className, ...rest }, ref) => {
    return (
      <Image
        ref={ref}
        width={width}
        height={height}
        src={src}
        alt={alt}
        {...rest}
        className={twMerge(className, 'rounded-[50%]')}
      />
    )
  }
)

Avatar.displayName = 'Avatar'
