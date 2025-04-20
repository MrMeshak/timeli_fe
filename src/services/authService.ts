import { httpClient } from './axios';

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  await httpClient.post('api/auth/login', payload);
  return;
}
