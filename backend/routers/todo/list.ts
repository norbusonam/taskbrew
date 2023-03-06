import { Request, Response } from "express";

export const listTodos = (req: Request, res: Response) => {
  res.send("Hello World");
};
