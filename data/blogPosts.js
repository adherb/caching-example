const defaultPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content:
      "Next.js is a powerful framework for building React applications...",
    date: "2024-03-20T12:00:00.000Z",
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    content: "Hooks are a revolutionary addition to React...",
    date: "2024-03-21T12:00:00.000Z",
  },
  {
    id: 3,
    title: "The Power of TypeScript",
    content: "TypeScript adds static typing to JavaScript...",
    date: "2024-03-22T12:00:00.000Z",
  },
  {
    id: 4,
    title: "CSS-in-JS Solutions Compared",
    content: "Exploring popular CSS-in-JS libraries and their pros and cons...",
    date: "2024-03-23T12:00:00.000Z",
  },
  {
    id: 5,
    title: "State Management in 2024",
    content: "From Redux to Zustand: Modern state management approaches...",
    date: "2024-03-24T12:00:00.000Z",
  },
];

export function loadPosts() {
  if (typeof window === "undefined") return defaultPosts;

  const savedPosts = localStorage.getItem("blogPosts");
  return savedPosts ? JSON.parse(savedPosts) : defaultPosts;
}

export function savePosts(posts) {
  if (typeof window === "undefined") return posts;

  localStorage.setItem("blogPosts", JSON.stringify(posts));
  return posts;
}

export function addPost(post) {
  const currentPosts = loadPosts();
  const maxId = Math.max(...currentPosts.map((p) => p.id), 0);
  const newPost = {
    ...post,
    id: maxId + 1,
  };
  const updatedPosts = [...currentPosts, newPost];
  return savePosts(updatedPosts);
}

export function deletePost(id) {
  const currentPosts = loadPosts();
  const updatedPosts = currentPosts.filter((post) => post.id !== id);
  return savePosts(updatedPosts);
}
