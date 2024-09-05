'use client'

import type { Hashtag } from '@/model/Hashtag'
import { useQuery } from '@tanstack/react-query'
import Trend from '../../_component/Trend'
import { getTrends } from '../../_lib/getTrands'

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />)
}
