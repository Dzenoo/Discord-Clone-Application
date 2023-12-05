export interface UserTypes {
  _id: string;
  username: string;
  name: string;
  email?: string;
  password?: string;
  directMessages?: string[];
  friends?: string[];
  servers?: string[];
  roles?: string[];
}
