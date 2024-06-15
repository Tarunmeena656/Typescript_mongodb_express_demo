import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";

import { APP_CONFIG } from "../config";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  active: boolean;
  deletedAt: Date;
  deletedBy: Schema.Types.ObjectId;
}

export enum USER_ROLES {
  USER = "user",
  ADMIN = "admin",
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, default: USER_ROLES.USER },
    active: { type: Boolean, default: true},
    deletedAt: {type: Date , default: null},
    deletedBy: { type: Schema.Types.ObjectId, default: null}
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
  const hashPassword = await hash(this.password, APP_CONFIG.SALT_ROUNDS);
  this.password = hashPassword;
});

userSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return compare(password, this.password);
};

export const userModel = model<IUser>("user", userSchema);
