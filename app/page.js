"use client";
import useSWR, { mutate } from "swr";
import { loadPosts, addPost, deletePost } from "../data/blogPosts";
import PostList from "./components/PostList";
import CreatePostForm from "./components/CreatePostForm";

export default function BlogArchive() {
  const { data: posts, isLoading } = useSWR("posts", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return loadPosts();
  });

  const handleNewPost = async (newPost) => {
    try {
      const newBlogPost = {
        ...newPost,
        date: new Date().toISOString(),
      };

      mutate(
        "posts",
        (currentPosts) => [...(currentPosts || []), newBlogPost],
        false
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedPosts = addPost(newBlogPost);
      mutate("posts", updatedPosts);
    } catch (error) {
      console.error("Error creating post:", error);
      mutate("posts");
    }
  };

  const handleDelete = async (id) => {
    try {
      mutate(
        "posts",
        (currentPosts) => currentPosts?.filter((post) => post.id !== id),
        false
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const updatedPosts = deletePost(id);
      mutate("posts", updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      mutate("posts");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Archive</h1>
        <PostList
          posts={posts || []}
          loading={isLoading}
          onDelete={handleDelete}
        />
        <CreatePostForm onSubmit={handleNewPost} />
      </div>
    </div>
  );
}
