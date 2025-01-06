import { loadPosts, addPost, deletePost } from "../data/blogPosts";

// Simulate API latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPosts() {
  await delay(500);
  return loadPosts();
}

export async function fetchPost(id) {
  await delay(500);
  const posts = loadPosts();
  return posts.find((post) => post.id === Number(id));
}

export async function createPost(postData) {
  await delay(500);
  return addPost(postData);
}

export async function removePost(id) {
  await delay(500);
  return deletePost(id);
}
