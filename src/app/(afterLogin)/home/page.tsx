import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query'
import PostForm from './_component/PostForm'
import PostRecommends from './_component/PostRecommends'
import Tab from './_component/Tab'
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
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </div>
  )
}
