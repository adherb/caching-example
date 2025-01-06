"use client";
import useSWR from "swr";
import { fetchPost } from "@/lib/api";
import Link from "next/link";
import { use } from "react";

export default function BlogPost({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const { data: post, isLoading } = useSWR(`posts/${id}`, () => fetchPost(id));

  if (isLoading) {
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
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Blog Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-4 block">
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
