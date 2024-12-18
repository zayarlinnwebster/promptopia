'use client';

import React, { useEffect, useState } from 'react';
import type Post from '../types/Post';
import PromptCardList from '@components/PromptCardList';

function Feed() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
    }

    setSearchText(e.target.value);

    const timeoutId = window.setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);

    setSearchTimeout(timeoutId);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult);
  };

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, 'i');

    return allPosts.filter(
      (post) =>
        regex.test(post.creator?.username || '') ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/prompt`);
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default "Enter" key behavior
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} // Disable "Enter" key behavior
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;
