import { Request, Response } from "express";

export const createTodo = (req: Request, res: Response) => {
  res.send("Hello World");
};
