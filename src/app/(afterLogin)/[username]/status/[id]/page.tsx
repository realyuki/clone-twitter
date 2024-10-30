import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getComments } from '../../_lib/getComments'
import CommentForm from './_component/CommentForm'
import Comments from './_component/Comments'
import SinglePost from './_component/SinglePost'
import { getSinglePostServer } from './_lib/getSinglePostServer'

import BackButton from '@/app/(afterLogin)/_component/BackButton'
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer'
import { Post } from '@/model/Post'
import { User } from '@/model/User'

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ['users', params.username]
  })
  const post: Post = await getSinglePostServer({
    queryKey: ['posts', params.id]
  })
  return {
    title: `X에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content
  }
}

type Props = {
  params: { id: string; username: string }
}

export default async function Page({ params }: Props) {
  const { id } = params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePostServer
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
