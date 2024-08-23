'use client'

import Main from '@/app/(beforeLogin)/_component/Main'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/i/flow/login')
  }, [])

  return <Main />
}
