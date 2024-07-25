import mongoose from "mongoose";

export type Data = {
  _id?: mongoose.Types.ObjectId;
  title: string;
  image: string;
};
