import { getAllPosts } from "@/_actions/postActions";
import CreateFinalForm from "@/components/lib-components/finalform/CreateFinalForm";
import Feature from "@/components/Feature";
import Loading from "@/components/Loading";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { resolve } from "path";
import React, { Suspense } from "react";

interface HomeProps {
  params?: { [key: string]: any };
  searchParams: URLSearchParams;
}

export default async function Home({ params, searchParams }: HomeProps) {
  const { posts, error } = await getAllPosts(searchParams);

  return (
    <div className="flex flex-col gap-5 text-center">
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <h1>Next.js MongoDB Server Actions</h1>
      {/* <PostForm /> */}
      <CreateFinalForm />
      <Feature />
      {posts && (
        <Suspense fallback={<Loading />}>
          <PostList posts={posts} />
        </Suspense>
      )}
    </div>
  );
}
