export interface UserTypes {
  _id: string;
  username: string;
  name: string;
  image: string;
  email?: string;
  password?: string;
  directMessages?: string[];
  friends?: string[];
  servers?: string[];
  roles?: string[];
}
