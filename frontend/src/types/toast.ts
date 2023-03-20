export type Toast = {
  id: string;
  title?: string;
  description?: string;
  type?: 'success' | 'info' | 'error' | 'warning';
  duration: number;
};
