import { Todo } from '../types';
import { client } from './client';
import { AuthResBody } from './types/auth-res-body';

export const api = {
  login: (body: { email: string; password: string }) => client.post<AuthResBody>('auth/login', body),
  signup: (body: { email: string; name: string; password: string }) => client.post<AuthResBody>('auth/signup', body),
  getTodos: (from: Date, to: Date) => client.get<{ todos: Todo[] }>('todos', { params: { from, to } }),
  createTodo: (body: { title: string; due: Date }) => client.post<{ todo: Todo }>('todos', body),
  updateTodo: (
    id: string,
    body: {
      title: string;
      completed: boolean;
      due: Date;
    },
  ) => client.put<{ todo: Todo }>(`todos/${id}`, body),
  deleteTodo: (id: string) => client.delete<null>(`todos/${id}`),
};
