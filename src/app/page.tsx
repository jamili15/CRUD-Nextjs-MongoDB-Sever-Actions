import { getAllPosts } from "@/_actions/postActions";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import Image from "next/image";

export default async function Home() {
  const { posts, error } = await getAllPosts();
  console.log("POST", posts);

  return (
    <div className="flex flex-col gap-5">
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <h1>Next js Mongodb server _actions</h1>

      <PostForm />

      {posts && <PostList posts={posts} />}
    </div>
  );
}
