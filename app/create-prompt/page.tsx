'use client'

import Form from '@components/Form';
import { useSession } from '@node_modules/next-auth/react';
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from 'react';

function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL_INTERNAL}/api/prompt/new`, {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      });

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    >

    </Form>
  )
}

export default CreatePrompt;