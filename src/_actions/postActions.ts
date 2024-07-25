"use server";

import dbConnect from "@/db/dbConnect";
import Post from "@/models/postModels";
import { Document } from "mongoose";
import { Data } from "@/types";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  try {
    await dbConnect();
    const posts: Data[] = await Post.find().lean();
    return { posts };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message || "Failed to fetct post!",
        status: "ERROR",
      };
    }
    return { error: "An unknown error occurred", status: "ERROR" };
  }
}

export async function createPost(body: Data) {
  try {
    await dbConnect();
    const newPost = new Post(body);
    await newPost.save();

    revalidatePath("/");

    return { ...newPost.toObject(), _id: newPost._id.toString() };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message || "Failed to create post",
        status: "ERROR",
      };
    }
    return {
      error: "Failed to create post due to an unknown error",
      status: "ERROR",
    };
  }
}

export async function updatePost({
  title,
  image,
  id,
}: {
  title: string;
  image: string;
  id: string;
}) {
  try {
    await dbConnect();
    const post = await Post.findByIdAndUpdate(
      id,
      { title, image },
      { new: true }
    ).exec();

    revalidatePath("/");

    return { ...post.toObject(), _id: post._id.toString() };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message || "Failed to update post",
        status: "ERROR",
      };
    }
    return {
      error: "Failed to update post due to an unknown error",
      status: "ERROR",
    };
  }
}

export async function deletePost(postId: string) {
  try {
    await dbConnect();
    const post = await Post.findByIdAndDelete(postId).exec();

    if (!post) {
      return {
        error: "Post not found",
        status: "ERROR",
      };
    }

    revalidatePath("/");

    return { ...post.toObject(), _id: post._id.toString() };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message || "Failed to delete post",
        status: "ERROR",
      };
    }
    return {
      error: "Failed to delete post due to an unknown error",
      status: "ERROR",
    };
  }
}
