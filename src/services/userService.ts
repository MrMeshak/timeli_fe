import { httpClient } from './axios';

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export async function fetchUserInfo() {
  return (await httpClient.get<IUserData>(`api/user/info`)).data;
}
