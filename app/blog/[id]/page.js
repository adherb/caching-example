"use client";
import { useState, useEffect, use } from "react";
import { loadPosts } from "../../../data/blogPosts";
import Link from "next/link";

export default function BlogPost({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Simulate API latency
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const foundPost = loadPosts().find((p) => p.id == id);
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to Blog Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
          ← Back to Blog Archive
        </Link>
        <article className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="text-gray-700">{post.content}</div>
        </article>
      </div>
    </div>
  );
}
