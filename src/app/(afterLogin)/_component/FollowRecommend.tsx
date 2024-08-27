'use client'

export default function FollowRecommend() {
  const onFollow = () => {}

  const user = {
    id: 'ghiblipicture',
    nickname: 'Studio Ghibli Pictures',
    image: '/follower.jpg'
  }

  return (
    <div className="flex flex-row px-[16px] py-[12px]">
      <div className="mr-[8px] h-[40px] w-[40px]">
        <img src={user.image} alt={user.id} className="rounded-[100%]" />
      </div>
      <div className="flex grow-[1] flex-col">
        <span className="text-[15px]">{user.nickname}</span>
        <span className="text-[#71767b] text-[15px]">@{user.id}</span>
      </div>
      <div>
        <button onClick={onFollow} className="button w-[auto]">
          Follow
        </button>
      </div>
    </div>
  )
}
