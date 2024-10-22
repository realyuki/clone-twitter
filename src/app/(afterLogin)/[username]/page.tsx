import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import UserInfo from './_component/UserInfo'
import UserPosts from './_component/UserPosts'
import { getUser } from './_lib/getUser'
import { getUserPosts } from './_lib/getUserPost'

import { auth } from '@/auth'

type Prop = {
  params: {
    username: string
  }
}

export default async function Profile({ params }: Prop) {
  const { username } = params
  const session = await auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser
  })

  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts
  })

  return (
    <div>
      <HydrationBoundary>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </div>
  )
}
