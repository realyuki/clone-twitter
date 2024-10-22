import { Metadata } from 'next'
import { Suspense } from 'react'
import PostForm from './_component/PostForm'
import Tab from './_component/Tab'
import TabDeciderSuspence from './_component/TabDeciderSuspence'
import TabProvider from './_component/TabProvider'
import Loading from './loading'

import { auth } from '@/auth'

export const metadata: Metadata = {
  title: '홈 / Realyuki',
  description: '홈'
}

export default async function Home() {
  const session = await auth()

  return (
    <div>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspence />
        </Suspense>
      </TabProvider>
    </div>
  )
}
