"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Data } from "@/types";
import { useMyContext } from "@/context/Provider";
import { deletePost } from "@/_actions/postActions";

interface PostCardProps {
  post: Data;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { setEditPost } = useMyContext();

  const handleDelete = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deletePost(postId);
    }
  };

  const imageUrl =
    post.image.startsWith("/") || post.image.startsWith("http")
      ? post.image
      : "/default-image.svg";

  return (
    <div>
      <Link href={"/"}>
        <Image
          src={imageUrl}
          alt={post?.title}
          quality={100}
          width={200}
          height={200}
          priority
        />
        <h3>{post?.title}</h3>
      </Link>
      <div className="flex gap-20">
        <button onClick={() => setEditPost(post)}>Edit</button>
        <button
          onClick={() => {
            if (post._id) {
              handleDelete(post._id.toString());
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
