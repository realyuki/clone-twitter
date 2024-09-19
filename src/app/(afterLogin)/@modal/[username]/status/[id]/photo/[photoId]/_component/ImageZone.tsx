'use client'

import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm'
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments'
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost'
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

type Props = {
  id: string
}

export default function ImageZone({ id }: Props) {
  const { data: post } = useQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  if (!post?.Images[0]) return null

  return (
    <div className="flex grow-[1] flex-row justify-between">
      <div className="flex h-[100vh] grow-[1] justify-center">
        <Image src={post.Images[0].link} alt={post.content} />
      </div>
      <div className="w-[350px] border-border border-l border-solid">
        <SinglePost id={id} noImage />
        <CommentForm id={id} />
        <Comments id={id} />
      </div>
    </div>
  )
}
