import { User } from './user.model';

export interface UserApiResponse {
  successful: boolean;
  result: User;
}
