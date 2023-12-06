import { MessageItem, ServerItem } from "./servers";

export interface UserTypes {
  _id: string;
  username: string;
  name: string;
  image: string;
  email?: string;
  password?: string;
  directMessages: DirectMessageType[];
  friends: {
    _id: string;
    username: string;
    image: string;
  }[];
  servers?: ServerItem[];
  roles?: string[];
  createdAt: string;
}

export interface DirectMessageType {
  user: UserTypes;
  messages: MessageItem[];
}
