'use client'

import { useRouter } from 'next/navigation'

import { Post } from '@/model/Post'

type Props = {
  children: React.ReactNode
  post: Post
}

export default function PostArticle({ children, post }: Props) {
  const router = useRouter()
  let target = post
  if (post.Original) {
    target = post.Original
  }
  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`)
  }

  return (
    <article onClick={onClick} className="border-border border-b border-solid px-[16px] py-[12px]">
      {children}
    </article>
  )
}
