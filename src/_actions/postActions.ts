"use server";

import dbConnect from "@/db/dbConnect";
import Post, { DataDocument } from "@/models/postModels";
import Post2 from "@/models/postModels";

import { revalidatePath } from "next/cache";

//getData with exec to get document  methods
//This approach uses Mongoose’s .exec() method to execute the query.
export async function getAllPosts() {
  try {
    await dbConnect();
    const posts: DataDocument[] = await Post.find().exec();

    const newData = posts.map((post: any) => ({
      ...post._doc,
      _id: post._id.toString(),
    }));

    return { posts: newData };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: message };
  }
}

export async function getOnePost({ _id }: { _id: string }) {
  try {
    await dbConnect();
    const post = await Post.findById(_id).exec();
    return {
      post: {
        ...post?.toObject(),
        _id: post?._id.toString(),
      },
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: message };
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

export async function createPost({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  try {
    await dbConnect();
    const newPost = new Post({ title, description, image }); // Ensure all fields are included
    const savedPost = await newPost.save();

    revalidatePath("/");
    return { data: savedPost };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: message };
  }
}

export async function updatePost({
  description,
  title,
  image,
  _id,
}: {
  description: string;
  title: string;
  image: string;
  _id: string;
}) {
  try {
    await dbConnect();
    const post = await Post.findByIdAndUpdate(
      _id,
      { title, image, description },
      { new: true }
    ).exec();

    revalidatePath("/");
    return { data: post };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: message };
  }
}

export async function deletePost({ _id }: { _id: string | number }) {
  try {
    await dbConnect();
    const post = await Post.findByIdAndDelete(_id).exec();

    if (!post) {
      return {
        error: "Post not found",
        status: "ERROR",
      };
    }

    revalidatePath("/");

    return { data: post };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: message };
  }
}
