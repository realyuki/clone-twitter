'use client'

import { useRouter } from 'next/navigation'

import type { PostImage } from '@/model/PostImage'
import type { User } from '@/model/User'

type Props = {
  children: React.ReactNode
  post: {
    postId: number
    content: string
    User: User
    createdAt: Date
    Images: PostImage[]
  }
}

export default function PostArticle({ children, post }: Props) {
  const router = useRouter()
  const onClick = () => {
    router.push(`/${post?.User.id}/status/${post.postId}`)
  }

  return (
    <article onClick={onClick} className="border-border border-b border-solid px-[16px] py-[12px]">
      {children}
    </article>
  )
}
