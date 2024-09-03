'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Trend from './Trend'

export default function TrendSection() {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (pathname === '/explore') return null

  if (session?.user) {
    return (
      <div className="rounded-[16px] border border-border border-solid">
        <div className="px-[16px] py-[12px]">
          <h3 className="font-bold text-[20px]">Trends for you</h3>
        </div>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    )
  }

  return (
    <div className="rounded-[16px] border border-border border-solid">
      <div className="px-[16px] py-[12px]">트렌드를 가져올 수 없습니다.</div>
    </div>
  )
}
