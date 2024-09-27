'use client'

import { useQuery } from '@tanstack/react-query'
import { getFollowRecommends } from '../_lib/getFollowRecommends'
import FollowRecommend from './FollowRecommend'

import type { User } from '@/model/User'

export default function FollowRecommendsSection() {
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  return data?.map((user) => <FollowRecommend user={user} key={user.id} />)
}
