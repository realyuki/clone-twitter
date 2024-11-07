'use client'

import { Session } from '@auth/core/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
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
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post'
      })
    },
    onMutate(userId: string) {
      queryClient.setQueryData(['users', 'followRecommends'], (prev: User[] | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          const user = draft.find((v) => v.id === userId)
          if (user) {
            user.Followers = [{ id: session?.user?.email as string }]
            user._count.Followers += 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (prev: User | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          draft.Followers = [{ id: session?.user?.email as string }]
          draft._count.Followers += 1
        })
      )
    },
    onError(error, userId: string) {
      console.error(error)
      queryClient.setQueryData(['users', 'followRecommends'], (prev: User[] | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          const user = draft.find((v) => v.id === userId)
          if (user) {
            user.Followers = user.Followers.filter((v) => v.id !== session?.user?.email)
            user._count.Followers -= 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (prev: User | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          draft.Followers = draft.Followers.filter((v) => v.id !== session?.user?.email)
          draft._count.Followers -= 1
        })
      )
    }
  })

  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete'
      })
    },
    onMutate(userId: string) {
      queryClient.setQueryData(['users', 'followRecommends'], (prev: User[] | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          const user = draft.find((v) => v.id === userId)
          if (user) {
            user.Followers = user.Followers.filter((v) => v.id !== session?.user?.email)
            user._count.Followers -= 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (prev: User | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          draft.Followers = draft.Followers.filter((v) => v.id !== session?.user?.email)
          draft._count.Followers -= 1
        })
      )
    },
    onError(error, userId: string) {
      console.error(error)
      queryClient.setQueryData(['users', 'followRecommends'], (prev: User[] | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          const user = draft.find((v) => v.id === userId)
          if (user) {
            user.Followers = [{ id: session?.user?.email as string }]
            user._count.Followers += 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (prev: User | undefined) =>
        produce(prev, (draft) => {
          if (!draft) return
          draft.Followers = [{ id: session?.user?.email as string }]
          draft._count.Followers += 1
        })
      )
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

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
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
        <div className="h-[200px] bg-gray"></div>
        <div className="px-[16px]">
          <Image
            width={140}
            height={140}
            src={user.image}
            alt={username}
            className="rounded-[50%] mt-[-70px] border-4 border-black border-solid"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end px-[16px] py-[12px]">
          {user.id !== session?.user?.email && (
            <button
              onClick={onFollow}
              className={`button h-[32px] min-h-[32px] w-[auto] text-[14px] ${followed ? 'text-white' : 'bg-white text-[#0f1419]'}`}
            >
              {followed ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
        <div className="flex flex-col px-[16px] py-[12px] border-border border-b border-solid">
          <strong className="font-bold text-[20px]">{user.nickname}</strong>
          <span className="text-[15px] text-gray">@{user.id}</span>
        </div>
      </div>
    </>
  )
}
