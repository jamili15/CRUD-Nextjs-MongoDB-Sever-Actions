import React from "react";
import PostCard from "./PostCard";
import { DataDocument } from "@/models/postModels";

interface PostProps {
  posts: DataDocument[];
}

const PostList: React.FC<PostProps> = async ({ posts }) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <div className="flex gap-20 flex-wrap">
      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
