'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupModal() {
  const router = useRouter()

  const onClickClose = () => {
    router.back()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dimmed">
      <div className="h-650 max-h-[90vh] min-h-400 min-w-600 max-w-[80vw] shrink-[1] rounded-16 bg-black p-80">
        <button onClick={onClickClose}>
          <svg
            width={20}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fill-[#eff3f4]"
          >
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        <div className="my-20 font-bold text-lg">Create your account</div>
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
