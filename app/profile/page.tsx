'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type Post from '../../types/Post';
import { useRouter } from 'next/navigation';

function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user.id) return; // Ensure that session and user.id are available
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, [session?.user.id]); // Added session?.user.id as a dependency

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post?._id?.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p: Post) => p._id !== post?._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
