import { getOnePost } from "@/_actions/postActions";
import PostCard from "@/components/PostCard";
import PostList from "@/components/PostList";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { post } = await getOnePost({ _id: params.id });

  console.log("\n\n\n POST =======> \n\n\n", post);
  return <div>{post && <PostCard post={post} />}</div>;
};

export default page;
