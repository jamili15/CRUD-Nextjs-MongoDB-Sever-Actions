import mongoose, { Document, Schema } from "mongoose";
import { Data } from "@/types";

const postSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collection: "post", timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model<Data>("Post", postSchema);

export default Post;
