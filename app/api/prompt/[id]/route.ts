import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
import type Context from '../../../../types/Context'

export const GET = async (req: Request, { params }: Context) => {
  const resolvedParams = await params

  try {
    await connectToDB()

    const prompt = await Prompt.findById(resolvedParams.id).populate('creator')

    if (!prompt) return new Response('Prompt not found!', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}

export const PATCH = async (req: Request, { params }: Context) => {
  const resolvedParams = await params
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(resolvedParams.id)

    if (!existingPrompt)
      return new Response('Prompt not found!', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Failed to update the prompt', { status: 500 })
  }
}

export const DELETE = async (req: Request, { params }: Context) => {
  const resolvedParams = await params

  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(resolvedParams.id)

    return new Response('Prompt deleted successfully.', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Failed to delete the prompt', { status: 500 })
  }
}
