"use server";

import dbConnect from "@/db/dbConnect";
import Post, { DataDocument } from "@/models/postModels";

import { revalidatePath } from "next/cache";

export async function getAllPosts(queryParams: any) {
  const search = queryParams.search || "";
  const sort = queryParams.sort || "createdAt";
  try {
    await dbConnect();

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const sortObj: Record<string, 1 | -1> = {};
    if (sort === "createdAt_asc") {
      sortObj.createdAt = 1;
    } else if (sort === "createdAt_desc") {
      sortObj.createdAt = -1;
    }

    const posts: DataDocument[] = await Post.find(query).sort(sortObj).exec();

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

export async function createPost(formData: {
  title: string;
  description: string;
  image: string;
}) {
  try {
    await dbConnect();
    const newPost = new Post(formData);
    await newPost.save();

    revalidatePath("/");
    return { ...newPost._doc, _id: newPost.id.toString() };
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
    return { ...post._doc, _id: post._id.toString() };
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
