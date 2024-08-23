'use client'

import { usePathname } from 'next/navigation'
import SearchForm from './SearchForm'

export default function RightSearchZone() {
  const pathname = usePathname()
  const onChangeFollow = () => {}
  const onChangeAll = () => {}

  if (pathname === '/explore') {
    return null
  }

  if (pathname === '/search') {
    return (
      <div>
        <div>검색 필터</div>
        <div>
          <div>모든 사용자</div>
        </div>
      </div>
    )
  }

  return <SearchForm />
}
