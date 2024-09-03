import type { PostImage } from './PostImage'
import type { User } from './User'

export interface Post {
  postId: number
  User: User
  content: string
  createdAt: Date
  images: PostImage[]
}
