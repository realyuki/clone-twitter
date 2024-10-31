import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MouseEventHandler, useState } from 'react'

import { Post } from '@/model/Post'

type Props = {
  white?: boolean
  post: Post
}

export default function ActionButtons({ white, post }: Props) {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const router = useRouter()
  const { postId } = post

  const reposted = !!post.Reposts?.find((v) => v.userId === session?.user?.email)
  const liked = !!post.Hearts?.find((v) => v.userId === session?.user?.email)

  const heart = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`, {
        method: 'post',
        credentials: 'include'
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey)

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey)

          if (value && 'pages' in value) {
            const updatedValue = produce(value, (draft) => {
              const obj = draft.pages.flat().find((v) => v.postId === postId)
              if (obj) {
                const pageIndex = draft.pages.findIndex((page) => page.includes(obj))
                const index = draft.pages[pageIndex].findIndex((v) => v.postId === postId)

                draft.pages[pageIndex][index].Hearts = [{ userId: session?.user?.email as string }]
                draft.pages[pageIndex][index]._count.Hearts += 1
              }
            })

            queryClient.setQueryData(queryKey, updatedValue)
          } else if (value) {
            // 싱글 포스트인 경우
            const updatedValue = produce(value, (draft) => {
              if (draft.postId === postId) {
                draft.Hearts = [{ userId: session?.user?.email as string }]
                draft._count.Hearts += 1
              }
            })

            queryClient.setQueryData(queryKey, updatedValue)
          }
        }
      })
    }
  })

  const unheart = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`, {
        method: 'delete',
        credentials: 'include'
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey)

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey)

          if (value && 'pages' in value) {
            // 여러 페이지로 이루어진 경우
            const updatedValue = produce(value, (draft) => {
              const obj = draft.pages.flat().find((v) => v.postId === postId)
              if (obj) {
                const pageIndex = draft.pages.findIndex((page) => page.includes(obj))
                const index = draft.pages[pageIndex].findIndex((v) => v.postId === postId)

                draft.pages[pageIndex][index].Hearts = draft.pages[pageIndex][index].Hearts.filter(
                  (v) => v.userId !== session?.user?.email
                )
                draft.pages[pageIndex][index]._count.Hearts -= 1
              }
            })

            queryClient.setQueryData(queryKey, updatedValue)
          } else if (value) {
            // 단일 포스트인 경우
            const updatedValue = produce(value, (draft) => {
              if (draft.postId === postId) {
                draft.Hearts = draft.Hearts.filter((v) => v.userId !== session?.user?.email)
                draft._count.Hearts -= 1
              }
            })

            queryClient.setQueryData(queryKey, updatedValue)
          }
        }
      })
    }
  })

  const repost = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`, {
        method: 'post',
        credentials: 'include'
      })
    },
    async onSuccess(response) {
      const data = await response.json()
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey)
      console.log('queryKeys', queryKeys)
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          console.log(queryKey[0])
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey)
          if (value && 'pages' in value) {
            console.log('array', value)
            const obj = value.pages.flat().find((v) => v.postId === postId)
            if (obj) {
              // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj))
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId)
              console.log('found index', index)
              const shallow = { ...value }
              value.pages = { ...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]]
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Reposts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Reposts: shallow.pages[pageIndex][index]._count.Reposts + 1
                }
              }
              shallow.pages[0].unshift(data)
              queryClient.setQueryData(queryKey, shallow)
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Reposts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Reposts: value._count.Reposts + 1
                }
              }
              queryClient.setQueryData(queryKey, shallow)
            }
          }
        }
      })
    }
  })

  const deleteRepost = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`, {
        method: 'delete',
        credentials: 'include'
      })
    },
    onSuccess() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey)
      console.log('queryKeys', queryKeys)
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey)
          if (value && 'pages' in value) {
            console.log('array', value)
            const obj = value.pages.flat().find((v) => v.postId === postId)
            const repost = value.pages
              .flat()
              .find((v) => v.Original?.postId === postId && v.User.id === session?.user?.email)
            if (obj) {
              // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj))
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId)
              console.log('found index', index)
              const shallow = { ...value }
              value.pages = { ...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]]
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Reposts: shallow.pages[pageIndex][index].Reposts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Reposts: shallow.pages[pageIndex][index]._count.Reposts - 1
                }
              }
              // 재게시 삭제
              shallow.pages = shallow.pages.map((page) => {
                return page.filter((v) => v.postId !== repost?.postId)
              })
              queryClient.setQueryData(queryKey, shallow)
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Reposts: value.Reposts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...value._count,
                  Reposts: value._count.Reposts - 1
                }
              }
              queryClient.setQueryData(queryKey, shallow)
            }
          }
        }
      })
    }
  })

  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (liked) {
      setIsAnimating(false)
      unheart.mutate()
    } else {
      setIsAnimating(true)
      heart.mutate()
    }
  }

  const onClickComment: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()

    // modalStore.setMode("comment");
    // modalStore.setData(post);
    router.push('/compose/tweet')
    const formData = new FormData()
    formData.append('content', '답글 테스트')
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/comments`, {
      method: 'post',
      credentials: 'include',
      body: formData
    })
  }

  const onClickRepost: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (!reposted) {
      repost.mutate()
    } else {
      deleteRepost.mutate()
    }
  }

  const [isAnimating, setIsAnimating] = useState(liked)

  return (
    <div className="flex gap-[24px]">
      <div className="flex items-center gap-[4px]">
        <button onClick={onClickComment}>
          <svg className="fill-white" width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
            </g>
          </svg>
        </button>
        <div>{post._count?.Comments || ''}</div>
      </div>
      <div className="flex items-center gap-[4px]">
        <button onClick={onClickRepost}>
          <svg className="fill-white" width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
            </g>
          </svg>
        </button>
        <div>{post._count?.Reposts || ''}</div>
      </div>
      <div className="flex items-center gap-[4px] hover:text-[#f91880]">
        <button onClick={onClickHeart} className="group">
          <div
            className={`cursor-pointer w-[50px] h-[50px] bg-[url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png')] bg-left bg-no-repeat bg-[length:2900%_auto] group-hover:bg-right ${
              isAnimating ? 'animate-heart-burst bg-right' : ''
            }`}
          ></div>
        </button>
        <div className={`ml-[-15px] ${isAnimating ? 'text-[#f91880]' : ''}`}>{post._count?.Hearts || ''}</div>
      </div>
    </div>
  )
}
