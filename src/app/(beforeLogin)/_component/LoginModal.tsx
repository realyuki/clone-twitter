'use client'

import Link from 'next/link'

export default function LoginModal() {
  const onClickClose = () => {}
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-dimmed">
      <div className="shrink-[1] min-w-[600px] min-h-[400px] max-w-[80vw] max-h-[90vh] h-[650px] bg-black p-[80px] rounded-md">
        <button onClick={onClickClose}>
          닫기
          {/* <svg
        width={24}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
      >
        <g>
          <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
        </g>
      </svg> */}
        </button>
        <div className="text-lg font-bold mt-[20px] mb-[20px]">
          Sign in to X
        </div>
        <div className="mt-[12px] mb-[12px]">
          <input placeholder="Name" />
        </div>
        <div>
          <Link href="">Next</Link>
        </div>
        <div>
          <Link href="">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
