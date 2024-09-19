'use client'

import Post from '@/app/(afterLogin)/_component/Post'
import type { Post as IPost } from '@/model/Post'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getComments } from '../../../_lib/getComments'

type Prop = {
  id: string
}

export default function Comments({ id }: Prop) {
  const queryClient = useQueryClient()
  const post = queryClient.getQueryData(['posts', id])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = useQuery<IPost[], Record<string, any>, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!post
  })

  if (!post) return null

  return data?.map((post) => <Post post={post} key={post.postId} />)
}
