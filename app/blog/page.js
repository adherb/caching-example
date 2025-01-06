"use client";
import { useState, useEffect } from "react";
import { loadPosts, addPost, deletePost } from "../../data/blogPosts";
import PostList from "./components/PostList";
import CreatePostForm from "./components/CreatePostForm";
import useSWR from "swr";

export default function BlogArchive() {
  const { data: posts, error, loading: isLoading } = useSWR("post", loadPosts);
  const [loading, setLoading] = useState(true);

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       setPosts(loadPosts());
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const handleNewPost = async (newPost) => {
    try {
      setLoading(true);
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newBlogPost = {
        ...newPost,
        date: new Date().toISOString(),
      };

      const updatedPosts = addPost(newBlogPost);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const updatedPosts = deletePost(id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Archive</h1>
        <PostList posts={posts} loading={isLoading} onDelete={handleDelete} />
        <CreatePostForm onSubmit={handleNewPost} />
      </div>
    </div>
  );
}
