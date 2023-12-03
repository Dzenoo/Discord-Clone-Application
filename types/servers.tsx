import mongoose from "mongoose";

export interface ServerTypes {
  name: string;
  image: string;
  creatorId: mongoose.Schema.Types.ObjectId;
}

export interface CreateServerFormTypes {
  dialogId: string;
  closeDialog: (dialogId: string) => void;
}
