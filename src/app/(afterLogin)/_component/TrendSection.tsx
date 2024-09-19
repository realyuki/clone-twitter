'use client'

import type { Hashtag } from '@/model/Hashtag'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { getTrends } from '../_lib/getTrands'
import Trend from './Trend'

export default function TrendSection() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user
  })

  if (pathname === '/explore') return null

  if (session?.user) {
    return (
      <div className="rounded-[16px] border border-border border-solid">
        <div className="px-[16px] py-[12px]">
          <h3 className="font-bold text-[20px]">Trends for you</h3>
        </div>
        {data?.map((trend) => <Trend trend={trend} key={trend.tagId} />)}
      </div>
    )
  }

  return (
    <div className="rounded-[16px] border border-border border-solid">
      <div className="px-[16px] py-[12px]">트렌드를 가져올 수 없습니다.</div>
    </div>
  )
}
