import BackButton from '@/app/(afterLogin)/_component/BackButton'
import Post from '@/app/(afterLogin)/_component/Post'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getComments } from '../../_lib/getComments'
import CommentForm from './_component/CommentForm'
import Comments from './_component/Comments'
import SinglePost from './_component/SinglePost'
import { getSinglePost } from './_lib/getSinglePost'

type Prop = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Prop) {
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
    <div>
      <HydrationBoundary state={dehydrated}>
        <div>
          <BackButton />
          <h3>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div className="flex flex-col">
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  )
}
