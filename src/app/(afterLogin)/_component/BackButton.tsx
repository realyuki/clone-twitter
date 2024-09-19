'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  const onClickBack = () => {
    router.back()
  }

  return (
    <button onClick={onClickBack}>
      <svg width={20} viewBox="0 0 24 24" aria-hidden="true" className="fill-white">
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </svg>
    </button>
  )
}
