// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get current user GET /api/auth/currentUser */
export async function currentUser(token:string, options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/auth/currUser', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

/** Login POST /api/auth/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logout POST /api/auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
