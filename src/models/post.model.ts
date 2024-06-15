import { Schema, model } from "mongoose";

interface IPost {
  title: string;
  description: string;
  postBy: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    postBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true, versionKey: false }
);

export const postModel = model<IPost>("post", postSchema);
