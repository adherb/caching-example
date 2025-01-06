import { loadPosts } from "../../data/blogPosts";

// Create a fetcher function
export const fetcher = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return loadPosts();
};
