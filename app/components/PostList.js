import Link from "next/link";

export default function PostList({ posts, loading, onDelete, onLike }) {
  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  const handleDeleteClick = (e, postId) => {
    e.preventDefault();
    onDelete(postId);
  };

  const handleLikeClick = (e, postId) => {
    e.preventDefault();
    onLike(postId);
  };

  return (
    <ul className="space-y-4 mb-8">
      {posts?.map((post) => (
        <li key={post.id}>
          <Link
            href={`/${post.id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex justify-between items-center block"
          >
            <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
              {post.title}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => handleLikeClick(e, post.id)}
                className="flex items-center gap-1 text-pink-500 hover:text-pink-700 p-2 rounded-full hover:bg-pink-50 transition-colors"
                aria-label="Like post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={post.likes > 0 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{post.likes || 0}</span>
              </button>
              <button
                onClick={(e) => handleDeleteClick(e, post.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Delete post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
