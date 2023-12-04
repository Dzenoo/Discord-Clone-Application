import mongoose, { Schema } from "mongoose";

export interface UserTypes {
  name: string;
  email: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema<UserTypes>({
  name: { type: String, required: [true, "Name is not valid"] },
  email: {
    type: String,
    required: [true, "Email is not valid"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is not valid"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is not valid"] },
});

const User =
  mongoose.models.User || mongoose.model<UserTypes>("User", UserSchema);

export default User;
