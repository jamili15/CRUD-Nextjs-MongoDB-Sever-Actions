"use server";

import dbConnect from "@/db/dbConnect";
import Post from "@/models/postModels";
import Post2 from "@/models/postModels";
import mongoose, { Document } from "mongoose";
import { Data } from "@/types";
import { revalidatePath } from "next/cache";

interface DataDocument extends Document<mongoose.Types.ObjectId>, Data {}

//getData with exec to get document  methods
//This approach uses Mongoose’s .exec() method to execute the query.
export async function getPosts() {
  try {
    await dbConnect();
    const posts: DataDocument[] = await Post.find().exec();
    return {
      posts: posts.map((post: any) => ({
        ...post.toObject(),
        _id: post._id.toString(),
      })),
    };
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

// getData // This approach uses Mongoose’s .lean() method to get plain JavaScript objects from MongoDB.
export async function getPost() {
  try {
    await dbConnect();
    const posts = await Post2.find().lean();
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

    const postObject = newPost.toObject();

    return { ...postObject, _id: postObject._id.toString() };
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

    const postObject = post.toObject();

    return { ...postObject, _id: postObject._id.toString() };
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

    const postObject = post.toObject();
    return { ...postObject, _id: postObject._id.toString() };
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
