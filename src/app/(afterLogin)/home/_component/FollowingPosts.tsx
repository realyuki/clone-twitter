'use client'

import type { Post as IPost } from '@/model/Post'
import { useQuery } from '@tanstack/react-query'
import Post from '../../_component/Post'
import { getFollowingPosts } from '../_lib/getFollowingPosts'

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000 //gcTime은 staleTime보다 무조건 커야 한다.
  })
  return data?.map((post) => <Post key={post.postId} post={post} />)
}
