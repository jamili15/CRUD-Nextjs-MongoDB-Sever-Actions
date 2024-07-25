import { ObjectId } from "mongoose";

export type Data = {
  _id?: ObjectId;
  title: string;
  image: string;
};
