'use client'

import PostForm from '@/app/(afterLogin)/home/_component/PostForm'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function TweetModal() {
  const [content, setContent] = useState()
  const imageRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onSubmit = () => {}
  const onClickClose = () => {
    router.back()
  }
  const onClickButton = () => {}
  const onChangeContent = () => {}

  const me = {
    id: 'realyuki',
    image: '/realyuki.png'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dimmed">
      <div className="w-[600px] rounded-16 bg-black p-16">
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
        <PostForm />
      </div>
    </div>
  )
}
