import mongoose, { Document, Schema } from "mongoose";

export interface DataDocument extends Document {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const postSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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
