import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the document
export interface DataDocument extends Document {
  firstname: string;
  lastname: string;
  age?: string;
  account: {
    username?: string;
    email?: string;
    password?: string;
  };
  colors?: { [key: string]: string }[]; // Use plain objects
  favoriteFoods?: Record<string, any>;
}

// Define the schema
const crendentialsSchema: Schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    account: {
      username: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      password: {
        type: String,
        required: false,
      },
    },
    colors: [
      {
        type: Schema.Types.Mixed, // Use Schema.Types.Mixed for flexible objects
      },
    ],
    favoriteFoods: [],
  },
  {
    collection: `${process.env.mongodb_collection}`,
    timestamps: true,
  }
);

// Create and export the model
const Crendentials =
  mongoose.models.Crendentials ||
  mongoose.model<DataDocument>("Crendentials", crendentialsSchema);

export default Crendentials;
