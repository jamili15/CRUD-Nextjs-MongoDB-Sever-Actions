"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useMyContext } from "@/context/Provider";
import { deletePost } from "@/_actions/postActions";
import { DataDocument } from "@/models/postModels";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: DataDocument;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { setEditPost } = useMyContext();
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deletePost({ _id: post._id });
    }
  };

  const imageUrl =
    post?.image?.startsWith("/") || post?.image?.startsWith("http")
      ? post.image
      : "/default-image.svg";

  const editPost = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col bg-gray-200 rounded items-center justify-center p-5">
        <Link href={`/post/${post._id}`}>
          <Image
            src={imageUrl}
            alt={post.title}
            className="rounded"
            quality={100}
            width={200}
            height={200}
            priority
          />
          <h3 className="text-center py-2 pb-3 font-bold">{post.title}</h3>
          <h3>{post.description}</h3>
        </Link>
      </div>
      <div className="flex gap-20 pt-3">
        <button
          onClick={() => {
            setEditPost(post);
            editPost();
          }}
          className="bg-green-200 px-4 rounded"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-200 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
