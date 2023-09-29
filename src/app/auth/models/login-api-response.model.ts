import { User } from '@app/user/model/user.model';

export interface LoginApiResponse {
  successful: boolean;
  result: string;
  user: User;
}
