'use client'

import type { Post as IPost } from '@/model/Post'
import { useQuery } from '@tanstack/react-query'
import Post from '../../_component/Post'
import { getPostRecommends } from '../_lib/getPostRecommends'

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000 //gcTime은 staleTime보다 무조건 커야 한다.
  })
  return data?.map((post) => <Post key={post.postId} post={post} />)
}
