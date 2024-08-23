'use client'

import { usePathname } from 'next/navigation'
import Trend from './Trend'

export default function TrendSection() {
  const pathname = usePathname()

  if (pathname === '/explore') return null

  return (
    <div>
      <div>
        <h3>Trends for you</h3>
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
    </div>
  )
}
