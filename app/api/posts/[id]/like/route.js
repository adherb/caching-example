import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

async function readPosts() {
  const data = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(data).posts;
}

async function writePosts(posts) {
  await fs.writeFile(dataFilePath, JSON.stringify({ posts }, null, 2));
}

export async function POST(request, { params }) {
  const posts = await readPosts();
  const postId = parseInt(params.id);

  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
  await writePosts(posts);

  return NextResponse.json(posts[postIndex]);
}
