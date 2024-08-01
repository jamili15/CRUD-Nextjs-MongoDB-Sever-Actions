import mongoose, { Document, Schema } from "mongoose";

export interface DataDocument extends Document {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const postSchema: Schema = new mongoose.Schema(
  {
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
      required: false,
    },
  },
  {
    collection: `${process.env.mongodb_collection}`,
    timestamps: true,
  }
);

const Post =
  mongoose.models.Post || mongoose.model<DataDocument>("Post", postSchema);

export default Post;
