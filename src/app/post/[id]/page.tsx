import { getOnePost } from "@/_actions/postActions";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: { id: string };
  searchParams?: Record<string, any>;
}

const Page = async ({ params: { id } }: PageProps) => {
  const { post } = await getOnePost({ _id: id });

  if (!post) {
    notFound();
  }

  console.log("\n\n\n POST =======> \n\n\n", post);
  return <div>{post && <PostCard post={post} />}</div>;
};

export default Page;
