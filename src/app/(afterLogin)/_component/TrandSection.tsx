'use client'

import { usePathname } from 'next/navigation'
import Trend from './Trend'

export default function TrendSection() {
  const pathname = usePathname()

  if (pathname === '/explore') return null

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
