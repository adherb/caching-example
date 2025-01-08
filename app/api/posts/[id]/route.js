import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

async function readPosts() {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.posts;
  } catch (error) {
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

export async function GET(request, { params }) {
  const posts = await readPosts();
  const post = posts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function DELETE(request, { params }) {
  const posts = await readPosts();
  const filteredPosts = posts.filter((p) => p.id !== parseInt(params.id));
  await writePosts(filteredPosts);
  return NextResponse.json({ message: "Post deleted" });
}
