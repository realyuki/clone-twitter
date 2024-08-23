import Post from '../_component/Post'
import PostForm from './_component/PostForm'
import TabProvider from './_component/TabProvider'
import Tab from './_component/Tab'

export default function Home() {
  return (
    <div>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </div>
  )
}
