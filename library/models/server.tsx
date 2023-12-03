import { ServerTypes } from "@/types/servers";
import mongoose, { Schema } from "mongoose";

const ServerSchema: Schema = new Schema<ServerTypes>({
  name: { type: String, required: [true, "Name is not valid"] },
  image: {
    type: String,
    required: [true, "Image is not valid"],
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is not valid"],
  },
});

const Server =
  mongoose.models.Server || mongoose.model<ServerTypes>("Server", ServerSchema);

export default Server;
