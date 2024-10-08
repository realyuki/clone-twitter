'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import Post from '../../_component/Post'
import { getFollowingPosts } from '../_lib/getFollowingPosts'

import type { Post as IPost } from '@/model/Post'

export default function FollowingPosts() {
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000 //gcTime은 staleTime보다 무조건 커야 한다.
  })

  return data?.map((post) => <Post key={post.postId} post={post} />)
}
