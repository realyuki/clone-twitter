import Post from '@/app/(afterLogin)/_component/Post'
import BackButton from '../_component/BackButton'

export default function Profile() {
  const user = {
    id: 'realyuki',
    nickname: '깽자',
    image: '/realyuki.png',
  }

  return (
    <div>
      <div>
        <BackButton />
        <h3>{user.nickname}</h3>
      </div>
      <div>
        <img src={user.image} alt={user.id} />
      </div>
      <div>
        <div>{user.nickname}</div>
        <div>@{user.id}</div>
      </div>
      <button>Follow</button>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}
