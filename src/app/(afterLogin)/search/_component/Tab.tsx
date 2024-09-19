'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Tab() {
  const [current, setCurrent] = useState('hot')
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClickHot = () => {
    setCurrent('hot')
    router.replace(`/search?q=${searchParams.get('q')}`)
  }

  const onClickRecent = () => {
    setCurrent('latest')
    router.replace(`/search?${searchParams.toString()}&f=live`)
  }

  return (
    <div className="flex flex-row border-border border-b border-solid">
      <div onClick={onClickHot} className="flex grow-[1] cursor-pointer justify-center text-[15px]">
        <div className="relative flex h-[53px] items-center">
          Hot
          <div hidden={current === 'latest'} className="absolute bottom-0 h-[3px] w-[100%] bg-blue"></div>
        </div>
      </div>
      <div onClick={onClickRecent} className="flex grow-[1] cursor-pointer justify-center text-[15px]">
        <div className="relative flex h-[53px] items-center">
          Latest
          <div hidden={current === 'hot'} className="absolute bottom-0 h-[3px] w-[100%] bg-blue"></div>
        </div>
      </div>
    </div>
  )
}
