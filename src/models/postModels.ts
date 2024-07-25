import mongoose, { Document, Schema } from "mongoose";
import { Data } from "@/types";

interface DataDocument extends Document<mongoose.Types.ObjectId>, Data {}

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

const Post =
  mongoose.models.Post || mongoose.model<DataDocument>("Post", postSchema);

export default Post;
