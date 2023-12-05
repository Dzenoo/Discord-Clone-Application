export interface ServerChannel {
  _id: string;
  name: string;
  type: "text" | "voice";
  messages: string[];
}

export interface ServersCategory {
  channels: ServerChannel[];
  _id: string;
  name: string;
}

export interface ServerItem {
  _id: string;
  name: string;
  image: string;
  creatorId: string;
  roles: {
    name: "Admin" | "Moderator" | "Member";
    members: string[];
  };
  categories: ServersCategory[];
  members: string[];
}
