'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Post from '../../_component/Post'
import { getUserPosts } from '../_lib/getUserPost'

import type { Post as IPost } from '@/model/Post'

type Prop = {
  username: string
}

export default function UserPosts({ username }: Prop) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = useQuery<IPost[], Record<string, any>, IPost[], [_1: string, _2: string, string]>({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['users', username])

  if (!user) return null

  return data?.map((post) => <Post key={post.postId} post={post} />)
}
