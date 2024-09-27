'use client'

import { useQuery } from '@tanstack/react-query'
import Post from '../../_component/Post'
import { getSearchResult } from '../_lib/getSearchResult'

import type { Post as IPost } from '@/model/Post'

type Props = {
  searchParams: { q: string; f?: string; pf?: string }
}

export default function SearchResult({ searchParams }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = useQuery<IPost[], Record<string, any>, IPost[], [_1: string, _2: string, Props['searchParams']]>({
    queryKey: ['posts', 'search', searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  return data?.map((post) => <Post key={post.postId} post={post} />)
}
