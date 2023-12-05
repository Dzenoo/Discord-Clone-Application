export interface ServerItem {
  _id: string;
  name: string;
  image: string;
  creatorId: string;
  roles: {
    name: "Admin" | "Moderator" | "Member";
    members: string[];
  };
  categories: [
    {
      _id: string;
      name: string;
      channels: {
        _id: string;
        name: string;
        type: "text" | "voice";
        messages: string[];
      }[];
    }
  ];
  members: string[];
}

export interface ServersCategory {
  channels: {
    _id: string;
    name: string;
    type: "text" | "voice";
    messages: string[];
  }[];
  _id: string;
  name: string;
}
