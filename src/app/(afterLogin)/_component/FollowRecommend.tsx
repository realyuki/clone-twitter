'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'

import type { User } from '@/model/User'

type Props = {
  user: User
}
export default function FollowRecommend({ user }: Props) {
  const { data: session } = useSession()
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email)
  console.log('followed', followed)
  const queryClient = useQueryClient()
  const follow = useMutation({
    mutationFn: (userId: string) => {
      console.log('follow', userId)
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post'
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends'])
      if (value) {
        const index = value.findIndex((v) => v.id === userId)
        console.log('follow onMutate', value, userId, index)
        const shallow = [...value]
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1
          }
        }
        queryClient.setQueryData(['users', 'followRecommends'], shallow)
      }
      const value2: User | undefined = queryClient.getQueryData(['users', userId])
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1
          }
        }
        queryClient.setQueryData(['users', userId], shallow)
      }
    },
    onError(error, userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends'])
      if (value) {
        const index = value.findIndex((v) => v.id === userId)
        console.log('follow onError', value, userId, index)
        const shallow = [...value]
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1
          }
        }
        queryClient.setQueryData(['users', 'followRecommends'], shallow)
        const value2: User | undefined = queryClient.getQueryData(['users', userId])
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1
            }
          }
          queryClient.setQueryData(['users', userId], shallow)
        }
      }
    }
  })
  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      console.log('unfollow', userId)
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete'
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends'])
      if (value) {
        const index = value.findIndex((v) => v.id === userId)
        console.log('unfollow onMutate', value, userId, index)
        const shallow = [...value]
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1
          }
        }
        queryClient.setQueryData(['users', 'followRecommends'], shallow)
        const value2: User | undefined = queryClient.getQueryData(['users', userId])
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1
            }
          }
          queryClient.setQueryData(['users', userId], shallow)
        }
      }
    },
    onError(error, userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends'])
      if (value) {
        const index = value.findIndex((v) => v.id === userId)
        console.log('unfollow onError', value, userId, index)
        const shallow = [...value]
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1
          }
        }
        queryClient.setQueryData(['users', 'followRecommends'], shallow)
      }
      const value2: User | undefined = queryClient.getQueryData(['users', userId])
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1
          }
        }
        queryClient.setQueryData(['users', userId], shallow)
      }
    }
  })
  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log('follow', followed, user.id)
    if (followed) {
      unfollow.mutate(user.id)
    } else {
      follow.mutate(user.id)
    }
  }

  return (
    <Link href={`/${user.id}`}>
      <div className="flex flex-row px-[16px] py-[12px]">
        <div className="mr-[8px] h-[40px] w-[40px]">
          <Image width={40} height={40} src={user.image} alt={user.id} className="rounded-[100%] h-[40px]" />
        </div>
        <div className="flex grow-[1] flex-col">
          <span className="text-[15px]">{user.nickname}</span>
          <span className="text-[15px] text-gray">@{user.id}</span>
        </div>
        <button
          onClick={onFollow}
          className="button h-[32px] min-h-[32px] w-[auto] bg-white text-[#0f1419] text-[14px]"
        >
          <span className="leading-none">{followed ? '팔로잉' : '팔로우'}</span>
        </button>
      </div>
    </Link>
  )
}
