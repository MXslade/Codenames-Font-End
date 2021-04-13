export interface IRole {
  id?: number;
  name: string;
}

export interface IUser {
  id?: number;
  email: string;
  username: string;
  password: string;
  fullName: string;
  roles?: IRole[];
}
