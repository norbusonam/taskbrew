import { List, Task, User } from '../types';
import { client } from './client';
import { AuthResBody } from './types/auth-res-body';

export type UpdateTaskBody = {
  title?: string;
  completed?: boolean;
  order?: number;
  listId?: string;
  due?: Date;
};

export type CreateTaskBody = {
  title: string;
  order: number;
  due?: Date;
  listId?: string;
};

export type UpdateListBody = {
  title?: string;
  order?: number;
};

export type CreateListBody = {
  title: string;
  order: number;
};

export const api = {
  login: (body: { email: string; password: string }) => client.post<AuthResBody>('auth/login', body),
  signup: (body: { email: string; name: string; password: string }) => client.post<AuthResBody>('auth/signup', body),
  updateUser: (body: { name?: string; email?: string }) => client.put<{ user: User }>('users', body),
  getTasks: () => client.get<{ tasks: Task[] }>('tasks'),
  createTask: (body: CreateTaskBody) => client.post<{ task: Task }>('tasks', body),
  updateTask: (id: string, body: UpdateTaskBody) => client.put<{ task: Task }>(`tasks/${id}`, body),
  deleteTask: (id: string) => client.delete<null>(`tasks/${id}`),
  getLists: () => client.get<{ lists: List[] }>('lists'),
  createList: (body: CreateListBody) => client.post<{ list: List }>('lists', body),
  updateList: (id: string, body: UpdateListBody) => client.put<{ list: List }>(`lists/${id}`, body),
  deleteList: (id: string) => client.delete<null>(`lists/${id}`),
};
