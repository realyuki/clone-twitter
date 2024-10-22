'use client'

import { Session } from '@auth/core/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
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

  if (error) {
    return (
      <div>
        <div>@{username}</div>
        <div>계정이 존재하지 않음</div>
      </div>
    )
  }

  if (!user) return null

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
          <button className="button mb-[12px] w-[auto]">Follow</button>
        </div>
        <div className="flex flex-col px-[16px] py-[12px]">
          <strong className="font-bold text-[20px]">{user.nickname}</strong>
          <span className="text-[15px] text-gray">@{user.id}</span>
        </div>
      </div>
    </>
  )
}
