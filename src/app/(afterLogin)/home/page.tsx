import { Suspense } from 'react'
import PostForm from './_component/PostForm'
import Tab from './_component/Tab'
import TabDeciderSuspence from './_component/TabDeciderSuspence'
import TabProvider from './_component/TabProvider'
import Loading from './loading'

export default async function Home() {
  return (
    <div>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspence />
        </Suspense>
      </TabProvider>
    </div>
  )
}
