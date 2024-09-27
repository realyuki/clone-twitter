import Image from 'next/image'
import Link from 'next/link'

import type { User } from '@/model/User'

type PostImagesProps = {
  post: {
    postId: number
    content: string
    User: User
    createdAt: Date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Images: any[]
  }
}

export default function PostImages({ post }: PostImagesProps) {
  if (!post?.Images) return null
  if (!post.Images.length) return null

  if (post.Images.length === 1) {
    return (
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[0]?.link})`,
          backgroundSize: 'contain'
        }}
      >
        <Image src={post.Images[0]?.link} alt="" />
      </Link>
    )
  }

  if (post.Images.length === 2) {
    return (
      <div className="grid h-[272px] grid-cols-[1fr_1fr]">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }

  if (post.Images.length === 3) {
    return (
      <div className="grid h-[272px] grid-cols-[1fr_1fr]">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[2]?.link})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }

  if (post.Images.length === 4) {
    return (
      <div className="grid h-[272px] grid-cols-[1fr_1fr]">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[2]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[3]?.link})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }

  return null
}
