"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import type Post from "../../../types/Post";
import type Params from '../../../types/Params';

// Define the type for the handler context with params as a Promise
interface Context {
  params: Promise<Params>
}


const UserProfile = ({ params }: Context) => {
  const resolvedParams = React.use(params); // Unwrap the promise

  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "Unknown User";

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resolved = await resolvedParams; // Await resolved params
      if (!resolved?.id) return; // Skip fetching if `id` is not available

      const response = await fetch(`/api/users/${resolved.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    fetchPosts();
  }, [resolvedParams]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
