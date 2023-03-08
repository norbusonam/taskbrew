export type AuthResBody = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
};
