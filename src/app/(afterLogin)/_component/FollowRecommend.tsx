'use client'

import type { User } from '@/model/User'

type Prop = {
  user: User
}

export default function FollowRecommend({ user }: Prop) {
  const onFollow = () => {}

  return (
    <div className="flex flex-row px-[16px] py-[12px]">
      <div className="mr-[8px] h-[40px] w-[40px]">
        <img src={user.image} alt={user.id} className="rounded-[100%]" />
      </div>
      <div className="flex grow-[1] flex-col">
        <span className="text-[15px]">{user.nickname}</span>
        <span className="text-[15px] text-gray">@{user.id}</span>
      </div>
      <button
        onClick={onFollow}
        className="button h-[32px] min-h-[32px] w-[auto] bg-white text-[#0f1419] text-[14px]"
      >
        <span className="leading-none">Follow</span>
      </button>
    </div>
  )
}
