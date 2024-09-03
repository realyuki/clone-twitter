import BackButton from '@/app/(afterLogin)/_component/BackButton'
import Post from '@/app/(afterLogin)/_component/Post'
import CommentForm from './_component/CommentForm'

export default function SinglePost() {
  return (
    <div>
      <div>
        <BackButton />
        <h3>게시하기</h3>
      </div>
      <Post />
      <CommentForm />
      <div className="flex flex-col">
        <Post />
        <Post />
        <Post />
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
