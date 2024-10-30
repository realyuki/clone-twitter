'use client'

import { Session } from '@auth/core/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { getUser } from '../_lib/getUser'

import BackButton from '@/app/(afterLogin)/_component/BackButton'
import type { User } from '@/model/User'

type Props = {
  username: string
  session: Session | null
}

export default function UserInfo({ username, session }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: user, error } = useQuery<User, Record<string, any>, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

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
        if (index > -1) {
          console.log(value, userId, index)
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
      }
      const value2: User | undefined = queryClient.getQueryData(['users', userId])
      if (value2) {
        const shallow: User = {
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
      console.error(error)
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends'])
      if (value) {
        const index = value.findIndex((v) => v.id === userId)
        console.log(value, userId, index)
        if (index > -1) {
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
        }
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
        console.log(value, userId, index)
        if (index > -1) {
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
        }
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
      console.error(error)
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends'])
      if (value) {
        const index = value.findIndex((v) => v.id === userId)
        console.log(value, userId, index)
        if (index > -1) {
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
      }
      const value2: User | undefined = queryClient.getQueryData(['users', userId])
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1
          }
        }
        queryClient.setQueryData(['users', userId], shallow)
      }
    }
  })

  if (error) {
    return (
      <div>
        <div>@{username}</div>
        <div>계정이 존재하지 않음</div>
      </div>
    )
  }

  if (!user) return null

  const followed = user.Followers?.find((v) => v.id === session?.user?.email)
  console.log(session?.user?.email, followed)

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
    <>
      <div className="flex px-[16px] py-[5px]">
        <BackButton />
        <div className="ml-[20px] flex grow-[1] flex-col">
          <h2 className="text-[20px]">{user.nickname}</h2>
        </div>
      </div>
      <div className="relative">
        <div className="h-[100px]">{/* <img src={user.bannerImage} alt="" /> */}</div>
        <div className="absolute left-16 mt-[-67px] w-[145px]">
          <Image
            width={40}
            height={40}
            src={user.image}
            alt={username}
            className="rounded-16 border-4 border-black border-solid w-[64px] h-[64px]"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end px-[16px] py-[12px]">
          {user.id !== session?.user?.email && <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>}
        </div>
        <div className="flex flex-col px-[16px] py-[12px]">
          <strong className="font-bold text-[20px]">{user.nickname}</strong>
          <span className="text-[15px] text-gray">@{user.id}</span>
        </div>
      </div>
    </>
  )
}
