'use client'

import type { Session } from '@auth/core/types'
import { useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react'

import { Avatar } from '@/app/(afterLogin)/_component/_ui'

type Props = {
  me: Session
}

export default function LogoutButton({ me }: Props) {
  const queryClient = useQueryClient()

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ['posts']
    })
    queryClient.invalidateQueries({
      queryKey: ['users']
    })
    signOut({ callbackUrl: '/' })
  }

  if (!me?.user) return null

  return (
    <button onClick={onLogout} className="my-[14px] flex w-[90%] items-center justify-between">
      <div className="flex w-[100%] items-center gap-[12px]">
        <div>
          <Avatar src={me?.user?.image as string} alt={me?.user?.email as string} />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[15px]">{me?.user?.name}</span>
          <span className="text-[15px] text-gray">@{me?.user?.email}</span>
        </div>
      </div>
    </button>
  )
}
