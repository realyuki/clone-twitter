'use client'

export default function FollowRecommend() {
  const onFollow = () => {}

  const user = {
    id: 'realyuki2',
    nickname: 'realyuki2',
    image: '/yRsRRjGO.jpg'
  }

  return (
    <div>
      <div>
        <img src={user.image} alt={user.id} />
      </div>
      <div>
        <div>{user.nickname}</div>
        <div>@{user.id}</div>
      </div>
      <div>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  )
}
