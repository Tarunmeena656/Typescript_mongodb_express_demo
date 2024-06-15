import { model, Schema } from "mongoose";

interface IComment {
  comment: String;
  postBy: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
  {
    comment: { type: String, required: true },
    postBy: { type: Schema.Types.ObjectId, ref: "user" },
    post: { type: Schema.Types.ObjectId, ref: "post" },
  },
  { timestamps: true, versionKey: false }
);

export const commentModel = model<IComment>("comment", commentSchema);
