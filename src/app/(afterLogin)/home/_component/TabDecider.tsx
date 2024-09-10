'use client'

import { use } from 'react'
import FollowingPosts from './FollowingPosts'
import PostRecommends from './PostRecommends'
import { TabContext } from './TabProvider'

export default function TabDecider() {
  const { tab } = use(TabContext)

  if (tab === 'rec') {
    return <PostRecommends />
  }

  return <FollowingPosts />
}
