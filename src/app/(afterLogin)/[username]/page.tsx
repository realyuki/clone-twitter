import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import UserInfo from './_component/UserInfo'
import UserPosts from './_component/UserPosts'
import { getUserPosts } from './_lib/getUserPost'
import { getUserServer } from './_lib/getUserServer'

import { auth } from '@/auth'
import { User } from '@/model/User'

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({ queryKey: ['users', params.username] })
  return {
    title: `${user.nickname} (${user.id}) / X`,
    description: `${user.nickname} (${user.id}) 프로필`
  }
}

type Props = {
  params: {
    username: string
  }
}

export default async function Profile({ params }: Props) {
  const { username } = params
  const session = await auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUserServer
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
