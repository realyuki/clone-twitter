'use client'

import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {
  me: Session
}

export default function LogoutButton({ me }: Props) {
  const router = useRouter()

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace('/')
    })
  }

  if (!me?.user) return null

  return (
    <button onClick={onLogout} className="my-[14px] flex w-[90%] items-center justify-between">
      <div className="flex w-[100%] items-center gap-[12px]">
        <div>
          <Image
            src={me?.user?.image as string}
            alt={me?.user?.email as string}
            width={40}
            height={40}
            className="rounded-[100%]"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[15px]">{me?.user?.name}</span>
          <span className="text-[15px] text-gray">@{me?.user?.email}</span>
        </div>
      </div>
    </button>
  )
}
