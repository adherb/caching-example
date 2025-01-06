import fs from "fs";
import path from "path";

const postsFile = path.join(process.cwd(), "data", "posts.json");

export function loadPosts() {
  try {
    const jsonData = fs.readFileSync(postsFile, "utf8");
    return JSON.parse(jsonData).posts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export function savePosts(posts) {
  try {
    fs.writeFileSync(postsFile, JSON.stringify({ posts }, null, 2));
    return posts;
  } catch (error) {
    console.error("Error saving posts:", error);
    return posts;
  }
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
