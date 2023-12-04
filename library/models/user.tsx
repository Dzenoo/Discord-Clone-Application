import mongoose, { Document, Schema } from "mongoose";

interface DirectMessageType {
  userId: mongoose.Types.ObjectId;
  messages: mongoose.Types.ObjectId[];
}

interface RoleType {
  serverId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
}

export interface UserTypes extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  directMessages?: DirectMessageType[];
  friends?: mongoose.Types.ObjectId[];
  servers?: mongoose.Types.ObjectId[];
  roles?: RoleType[];
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
});

const User =
  mongoose.models.User || mongoose.model<UserTypes>("User", UserSchema);

export default User;
