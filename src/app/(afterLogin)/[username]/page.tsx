import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import UserInfo from './_component/UserInfo'
import UserPosts from './_component/UserPosts'
import { getUser } from './_lib/getUser'
import { getUserPosts } from './_lib/getUserPost'

type Prop = {
  params: {
    username: string
  }
}

export default async function Profile({ params }: Prop) {
  const { username } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser
  })

  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts
  })

  const user = {
    id: 'realyuki',
    nickname: '깽자',
    image: '/realyuki.png',
    bannerImage: '/banner.jpg',
    posts: 10
  }

  return (
    <div>
      <HydrationBoundary>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </div>
  )
}
