'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthSession({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
