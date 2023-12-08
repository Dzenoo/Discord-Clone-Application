import { DirectMessageType } from "@/types/users";
import mongoose, { Document, Schema } from "mongoose";

interface RoleType {
  serverId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
}

export interface UserTypes extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  username: string;
  image: string;
  password: string;
  directMessages?: DirectMessageType[];
  friends?: mongoose.Types.ObjectId[];
  servers?: mongoose.Types.ObjectId[];
  roles?: RoleType[];
}

const UserSchema: Schema = new Schema<UserTypes>(
  {
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
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzwb60tk1/image/upload/v1701812367/v3lldpxutpahtv0pon3j.png",
    },
    password: { type: String, required: [true, "Password is not valid"] },
    directMessages: [
      {
        userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        messages: [
          {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Message",
          },
        ],
      },
    ],
    friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    servers: [{ type: mongoose.Types.ObjectId, ref: "Server" }],
    roles: [
      {
        _id: false,
        serverId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Server",
        },
        roleId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Server.roles",
        },
      },
    ],
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<UserTypes>("User", UserSchema);

export default User;
