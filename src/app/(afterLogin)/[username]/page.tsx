import Post from '@/app/(afterLogin)/_component/Post'
import BackButton from '../_component/BackButton'

export default function Profile() {
  const user = {
    id: 'realyuki',
    nickname: '깽자',
    image: '/realyuki.png',
    bannerImage: '/banner.jpg',
    posts: 10
  }

  return (
    <div>
      <div className="flex px-[16px] py-[5px]">
        <BackButton />
        <div className="ml-[20px] flex grow-[1] flex-col">
          <h2 className="text-[20px]">{user.nickname}</h2>
          <span className="text-[13px] text-gray">{user.posts} posts</span>
        </div>
      </div>
      <div className="relative">
        <div>
          <img src={user.bannerImage} alt="" />
        </div>
        <div className="absolute left-16 mt-[-67px] w-[145px]">
          <img
            src={user.image}
            alt={user.id}
            className="rounded-16 border-4 border-black border-solid"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end px-[16px] py-[12px]">
          <button className="button mb-[12px] w-[auto]">Follow</button>
        </div>
        <div className="flex flex-col px-[16px] py-[12px]">
          <strong className="font-bold text-[20px]">{user.nickname}</strong>
          <span className="text-[15px] text-gray">@{user.id}</span>
        </div>
      </div>
      <div>
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
    </div>
  )
}
