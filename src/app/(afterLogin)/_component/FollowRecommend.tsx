'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
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
  const queryClient = useQueryClient()
  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post'
      })
    },
    onMutate(userId: string) {
      queryClient.setQueryData(['users', 'followRecommends'], (value: User[] | undefined) =>
        produce(value, (draft) => {
          const userToUpdate = draft?.find((v) => v.id === userId)
          if (userToUpdate) {
            userToUpdate.Followers = [{ id: session?.user?.email as string }]
            userToUpdate._count.Followers += 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (value: User | undefined) =>
        produce(value, (draft) => {
          if (draft) {
            draft.Followers = [{ id: session?.user?.email as string }]
            draft._count.Followers += 1
          }
        })
      )
    },
    onError(error, userId: string) {
      queryClient.setQueryData(['users', 'followRecommends'], (value: User[] | undefined) =>
        produce(value, (draft) => {
          const userToUpdate = draft?.find((v) => v.id === userId)
          if (userToUpdate) {
            userToUpdate.Followers = userToUpdate.Followers.filter((v) => v.id !== session?.user?.email)
            userToUpdate._count.Followers -= 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (value: User | undefined) =>
        produce(value, (draft) => {
          if (draft) {
            draft.Followers = draft.Followers.filter((v) => v.id !== session?.user?.email)
            draft._count.Followers -= 1
          }
        })
      )
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
      queryClient.setQueryData(['users', 'followRecommends'], (value: User[] | undefined) =>
        produce(value, (draft) => {
          const userToUpdate = draft?.find((v) => v.id === userId)
          if (userToUpdate) {
            userToUpdate.Followers = userToUpdate.Followers.filter((v) => v.id !== session?.user?.email)
            userToUpdate._count.Followers -= 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (value: User | undefined) =>
        produce(value, (draft) => {
          if (draft) {
            draft.Followers = draft.Followers.filter((v) => v.id !== session?.user?.email)
            draft._count.Followers -= 1
          }
        })
      )
    },
    onError(error, userId: string) {
      queryClient.setQueryData(['users', 'followRecommends'], (value: User[] | undefined) =>
        produce(value, (draft) => {
          const userToUpdate = draft?.find((v) => v.id === userId)
          if (userToUpdate) {
            userToUpdate.Followers = [{ id: session?.user?.email as string }]
            userToUpdate._count.Followers += 1
          }
        })
      )

      queryClient.setQueryData(['users', userId], (value: User | undefined) =>
        produce(value, (draft) => {
          if (draft) {
            draft.Followers = [{ id: session?.user?.email as string }]
            draft._count.Followers += 1
          }
        })
      )
    }
  })

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
