import type { QueryFunction } from '@tanstack/react-query'

import type { User } from '@/model/User'

export const getUser: QueryFunction<User, [_1: string, _2: string]> = async ({ queryKey }) => {
  const [_1, username] = queryKey
  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    next: {
      tags: ['users', username]
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
