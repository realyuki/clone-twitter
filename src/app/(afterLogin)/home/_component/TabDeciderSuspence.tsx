import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getPostRecommends } from '../_lib/getPostRecommends'
import TabDecider from './TabDecider'

export default async function TabDeciderSuspence() {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0
  })
  const dehydrateState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateState}>
      <TabDecider />
    </HydrationBoundary>
  )
}
