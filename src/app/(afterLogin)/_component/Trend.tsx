import Link from 'next/link'

import type { Hashtag } from '@/model/Hashtag'

type Prop = {
  trend: Hashtag
}

export default function Trend({ trend }: Prop) {
  return (
    <Link href={`/search?q=${encodeURIComponent(trend.title)}`} className="flex flex-col px-[16px] py-[12px]">
      <span className="text-[13px] text-gray">Trending in South Korea</span>
      <span className="font-bold text-[15px]">{trend.title}</span>
      <span className="text-[13px] text-gray">{trend.count.toLocaleString()} posts</span>
    </Link>
  )
}
