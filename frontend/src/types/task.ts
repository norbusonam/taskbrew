export type Task = {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  listId: string | null;
  due: string | null;
};
