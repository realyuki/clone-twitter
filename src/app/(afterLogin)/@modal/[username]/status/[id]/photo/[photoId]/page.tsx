import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm'
import BackButton from '@/app/(afterLogin)/_component/BackButton'
import Post from '@/app/(afterLogin)/_component/Post'
import { faker } from '@faker-js/faker'
import CloseButton from './_component/CloseButton'

export default function Default() {
  const photo = {
    imageId: 1,
    link: faker.image.urlLoremFlickr(),
    Post: {
      content: faker.lorem.text()
    }
  }

  return (
    <div className="fixed inset-0 bg-black">
      <CloseButton />
      <div className="flex grow-[1] flex-row justify-between">
        <div className="flex h-[100vh] grow-[1] justify-center">
          <img src={photo.link} alt={photo.Post?.content} />
        </div>
        <div className="w-[350px] border-border border-l border-solid">
          <Post noImage />
          <CommentForm />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  )
}
