import { IUser } from 'app/shared/model/user.model';

export interface IRoom {
  id?: number;
  name?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IRoom> = {};
