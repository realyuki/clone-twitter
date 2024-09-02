'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginModal() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const onClickClose = () => {
    router.back()
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await signIn('credentials', {
        username: id,
        password,
        redirect: false
      })
      if (!response?.ok) {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.')
      } else {
        router.replace('/home')
      }
    } catch (err) {
      console.error(err)
      setMessage('아이디와 비밀번호가 일치하지 않습니다.')
    }
  }

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dimmed">
      <div className="flex h-650 max-h-[90vh] min-h-400 min-w-600 max-w-[80vw] shrink-[1] justify-center rounded-16 bg-black p-80">
        <div className="box-border max-w-364 flex-[1] px-[32px]">
          <button onClick={onClickClose}>
            <svg
              width={20}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-white"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div className="my-20 font-bold text-lg">Sign in to X</div>
          <form onSubmit={onFormSubmit}>
            <div className="my-12">
              <input
                type="text"
                className="input"
                placeholder="Phone, email, or username"
                id="id"
                value={id}
                onChange={onChangeId}
              />
            </div>
            <div className="my-12">
              <input
                type="password"
                className="input"
                placeholder="password"
                id="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div>{message}</div>
            <div>
              <button
                className="button my-12 w-[100%] max-w-[100%] bg-white text-[#0f1419]"
                disabled={!id && !password}
              >
                Next
              </button>
            </div>
            <div>
              <Link
                className="button my-12 w-[100%] max-w-[100%] text-white"
                href=""
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
