'use client'

import { useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode
  post: {
    postId: number
    content: string
    User: {
      id: string
      nickname: string
      image: string
    }
    createAt: Date
    Images: any[]
  }
}

export default function PostArticle({ children, post }: Props) {
  const router = useRouter()
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`)
  }

  return <article onClickCapture={onClick}>{children}</article>
}
