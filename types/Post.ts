import type User from './User'

interface Post {
  _id?: string
  userId?: string
  prompt: string
  tag: string
  creator?: User
}

export default Post
