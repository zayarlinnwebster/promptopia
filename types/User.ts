import type { Document } from 'mongoose'

export interface User extends Document {
  email: string
  username: string
  image?: string
}

export default User
