import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

async function readPosts() {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.posts;
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

async function writePosts(posts) {
  const dirPath = path.join(process.cwd(), "data");
  try {
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify({ posts }, null, 2));
  } catch (error) {
    console.error("Error writing posts:", error);
    throw error;
  }
}

export async function GET() {
  const posts = await readPosts();
  return Response.json(posts);
}

export async function POST(request) {
  const posts = await readPosts();
  const post = await request.json();

  const newPost = {
    ...post,
    id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  await writePosts(posts);

  return Response.json(newPost);
}

export async function DELETE(request) {
  const id = parseInt(request.url.split("/").pop());

  const posts = await readPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);
  await writePosts(filteredPosts);

  return Response.json({ success: true });
}
