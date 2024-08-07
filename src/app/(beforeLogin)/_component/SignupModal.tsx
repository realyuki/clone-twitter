'use client'

import Link from 'next/link'

export default function SignupModal() {
  const onClickClose = () => {}

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dimmed">
      <div className="rounded-16 min-h-400 min-w-600 h-650 max-h-[90vh] max-w-[80vw] shrink-[1] bg-black p-80">
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
        <div className="my-20 text-lg font-bold">Create your account</div>
        <div className="my-12">
          <input className="input" placeholder="Name" />
        </div>
        <div className="my-12">
          <input className="input" placeholder="Phone" />
        </div>
        <div>
          <Link
            className="button h-[50px] w-[100%] max-w-[100%] bg-white text-[#051419]"
            href=""
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  )
}
