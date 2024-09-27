'use client'

import { useQuery } from '@tanstack/react-query'
import { getSinglePost } from '../_lib/getSinglePost'

import Post from '@/app/(afterLogin)/_component/Post'
import type { Post as IPost } from '@/model/Post'

type Prop = {
  id: string
  noImage?: boolean
}

export default function SinglePost({ id, noImage }: Prop) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: post, error } = useQuery<IPost, Record<string, any>, IPost, [_1: string, _2: string]>({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  if (error) {
    return <div>게시글을 찾을 수 없습니다.</div>
  }

  if (!post) return null

  return <Post key={post.postId} post={post} noImage={noImage} />
}
