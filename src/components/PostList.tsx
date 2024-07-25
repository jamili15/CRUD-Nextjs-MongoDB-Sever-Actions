import React from "react";
import PostCard from "./PostCard";
import { Data } from "@/types";

interface PostProps {
  posts: Data[];
}

const PostList: React.FC<PostProps> = ({ posts }) => {
  return (
    <div className="flex gap-20 flex-wrap">
      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
