import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected!')
    return
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables')
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'PinkPanther',
    })

    isConnected = true

    console.log('MongoDB is connected.')
  } catch (error) {
    console.error(error)
  }
}
