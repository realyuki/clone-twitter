import { getComments } from '@/app/(afterLogin)/[username]/_lib/getComments'
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost'
import { faker } from '@faker-js/faker'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query'
import CloseButton from './_component/CloseButton'
import ImageZone from './_component/ImageZone'

type Props = {
  params: {
    id: string
  }
}

export default async function Default({ params }: Props) {
  const { id } = params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePost
  })
  await queryClient.prefetchQuery({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments
  })
  const dehydrated = dehydrate(queryClient)

  return (
    <div className="fixed inset-0 bg-black">
      <HydrationBoundary state={dehydrated}>
        <CloseButton />
        <ImageZone id={id} />
      </HydrationBoundary>
    </div>
  )
}
