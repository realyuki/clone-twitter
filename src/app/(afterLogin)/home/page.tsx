import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query'
import PostForm from './_component/PostForm'
import Tab from './_component/Tab'
import TabDecider from './_component/TabDecider'
import TabProvider from './_component/TabProvider'
import { getPostRecommends } from './_lib/getPostRecommends'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends
  })
  const dehydrateState = dehydrate(queryClient)

  return (
    <div>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </div>
  )
}
