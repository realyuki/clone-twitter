'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function RQProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, //탭전환시 데이터를 새로
          retryOnMount: true, //컴포넌트가 다시 마운트 될 때
          refetchOnReconnect: false, //인터넷 연결이 다시 될 때
          retry: false //데이터를 가져오기 실패시 재시도 여부
        }
      }
    })
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} />
    </QueryClientProvider>
  )
}
