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

export interface IGameBoardCell {
  row: number;
  column: number;
  color: string;
}

export interface IGameBoardConfig {
  id?: number;
  config: IGameBoardCell[];
}

export interface IGameRoom {
  id?: number;
  name: string;
  config: string | null;
  maxNumberOfPlayers: number;
  language: string;
  active: boolean;
}
