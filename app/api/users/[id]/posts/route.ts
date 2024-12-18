import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
import type Context from '../../../../../types/Context'

export const GET = async (req: Request, { params }: Context) => {
  const resolvedParams = await params

  try {
    await connectToDB()

    const prompts = await Prompt.find({
      creator: resolvedParams?.id,
    }).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
