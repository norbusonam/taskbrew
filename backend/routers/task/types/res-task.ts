export type ResTask = {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  listId: string | null;
  due: Date | null;
};
