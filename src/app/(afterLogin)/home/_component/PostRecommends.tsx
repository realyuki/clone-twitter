'use client'

import type { Post as IPost } from '@/model/Post'
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Post from '../../_component/Post'
import { getPostRecommends } from '../_lib/getPostRecommends'

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isError } =
    useInfiniteQuery<
      IPost[],
      Record<string, any>,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000 //gcTime은 staleTime보다 무조건 커야 한다.
    })

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  })

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  if (isError) return null

  return data?.pages.map((page, i) => (
    <>
      {/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
      <Fragment key={i}>
        {page.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </Fragment>
      <div ref={ref} style={{ height: 50 }} />
    </>
  ))
}
