import { User } from '../../types';

export type AuthResBody = {
  user: User;
  token: string;
};
