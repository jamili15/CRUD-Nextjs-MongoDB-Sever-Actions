"use server";

import dbConnect from "@/db/dbConnect";
import Post, { DataDocument } from "@/models/postModels";
import Crendentials from "@/models/crendentialsModel";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export async function getAllPosts(queryParams: any) {
  const search = queryParams.search || "";
  const sort = queryParams.sort || "createdAt";
  try {
    await dbConnect();
    
    const db = mongoose.connection.useDb("server_actions")
    const collection = db.model("Post", Post.schema);
    
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const sortObj: Record<string, 1 | -1> = {};
    if (sort === "createdAt_asc") {
      sortObj.createdAt = 1;
    } else if (sort === "createdAt_desc") {
      sortObj.createdAt = -1;
    }

    const posts = await collection.find(query).sort(sortObj).exec();

    const newData = posts.map((post: any) => ({
      ...post._doc,
      _id: post._id.toString(),
    }));

    return { posts: newData };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function getOnePost({ _id }: { _id: string }) {

  const db = mongoose.connection.useDb("server_actions")
  const collection = db.model("Post", Post.schema);
  try {
    await dbConnect();
    const post = await collection.findById(_id).exec();
    return {
      post: {
        ...post?.toObject(),
        _id: (post?._id as mongoose.Types.ObjectId).toString(),
      },
    };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function createFormData(formData: Record<string, any>) {
  try {
    await dbConnect();
    const newPost = new Post(formData);
    await newPost.save();

    revalidatePath("/");
    return { ...newPost._doc, _id: newPost.id.toString() };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function createPost(formValues: Record<string, any>) {
  try {
    await dbConnect();
    const newPost = new Post(formValues);
    await newPost.save();

    revalidatePath("/");
    return { ...newPost._doc, _id: newPost.id.toString() };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function updatePost(data: Record<string, any>) {
  const db = mongoose.connection.useDb("server_actions")
  const collection = db.model("Post", Post.schema);
  
  try {
    const { _id, ...updateData } = data;

    if (!_id) {
      throw new Error("Post ID is required for updating.");
    }

    await dbConnect();
    const post = (await collection.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    }).lean()) as { _id: string } | null;

    if (!post) {
      throw new Error("Post not found");
    }

    revalidatePath("/");
    return { ...post, _id: post._id.toString() };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function deletePost({ _id }: { _id: string | number }) {
  const db = mongoose.connection.useDb("server_actions")
  const collection = db.model("Post", Post.schema);
  try {
    await dbConnect();
    const post = await collection.findByIdAndDelete(_id).exec();

    if (!post) {
      return {
        error: "Post not found",
        status: "ERROR",
      };
    }

    revalidatePath("/");

    return { postId: (post._id as mongoose.Types.ObjectId).toString() };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
