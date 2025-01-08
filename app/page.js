"use client";
import useSWR, { mutate } from "swr";
import PostList from "./components/PostList";
import CreatePostForm from "./components/CreatePostForm";
import fetcher from "@/lib/fetcher";

const createPost = async (post) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

const removePost = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return response.json();
};

const likePost = async (id) => {
  const response = await fetch(`/api/posts/${id}/like`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to like post");
  }

  return response.json();
};

export default function BlogArchive() {
  const { data: posts, isLoading } = useSWR("/api/posts", fetcher, {
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });

  const handleNewPost = async (newPost) => {
    try {
      // Optimistic update
      mutate(
        "/api/posts",
        [...(posts || []), { ...newPost, id: Date.now() }],
        false
      );

      // Actual API call
      await createPost(newPost);
      mutate("/api/posts"); // Revalidate to get the actual data
    } catch (error) {
      console.error("Error creating post:", error);
      mutate("/api/posts"); // Revalidate to restore the correct state
    }
  };

  const handleDelete = async (id) => {
    try {
      // Optimistic update
      mutate(
        "/api/posts",
        posts?.filter((post) => post.id !== id),
        false
      );

      // Actual API call
      await removePost(id);
      mutate("/api/posts"); // Revalidate to ensure consistency
    } catch (error) {
      console.error("Error deleting post:", error);
      mutate("/api/posts"); // Revalidate to restore the correct state
    }
  };

  const handleLike = async (id) => {
    try {
      // Find the post and create updated version
      const post = posts.find((p) => p.id === id);
      const updatedPost = { ...post, likes: (post.likes || 0) + 1 };

      // Optimistic update
      mutate(
        "/api/posts",
        posts.map((p) => (p.id === id ? updatedPost : p)),
        false
      );

      // Actual API call
      await likePost(id);
      mutate("/api/posts"); // Revalidate to ensure consistency
    } catch (error) {
      console.error("Error liking post:", error);
      mutate("/api/posts"); // Revalidate to restore the correct state
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
          onLike={handleLike}
        />
        <CreatePostForm onSubmit={handleNewPost} />
      </div>
    </div>
  );
}
