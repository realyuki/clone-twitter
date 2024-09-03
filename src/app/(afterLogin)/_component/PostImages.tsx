import type { User } from '@/model/User'
import Link from 'next/link'

type PostImagesProps = {
  post: {
    postId: number
    User: User
    content: string
    createdAt: Date
    images: any[]
  }
}

export default function PostImages({ post }: PostImagesProps) {
  if (!post?.images) return null
  if (!post.images.length) return null

  if (post.images.length === 1) {
    return (
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
        style={{
          backgroundImage: `url(${post.images[0]?.link})`,
          backgroundSize: 'contain'
        }}
      >
        <img src={post.images[0]?.link} alt="" />
      </Link>
    )
  }

  if (post.images.length === 2) {
    return (
      <div className="grid h-[272px] grid-cols-[1fr_1fr]">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }

  if (post.images.length === 3) {
    return (
      <div className="grid h-[272px] grid-cols-[1fr_1fr]">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.images[2]?.link})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }

  if (post.images.length === 4) {
    return (
      <div className="grid h-[272px] grid-cols-[1fr_1fr]">
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.images[2]?.link})`,
            backgroundSize: 'cover'
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.images[3].imageId}`}
          style={{
            backgroundImage: `url(${post.images[3]?.link})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }

  return null
}
