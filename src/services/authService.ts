import { httpClient } from './axios';

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  return (await httpClient.post('api/auth/login', payload)).data;
}

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function signup(payload: SignupPayload) {
  return await httpClient.post('api/auth/signup', payload);
}

export type PasswordForgotPayload = {
  email: string;
};

export async function passwordForgot(payload: PasswordForgotPayload) {
  return (await httpClient.post('api/auth/passwordForgot', payload)).data;
}
