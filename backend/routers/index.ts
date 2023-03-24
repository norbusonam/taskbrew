import { Router } from "express";
import { checkAuth } from "../middleware";
import { login, signup } from "./auth";
import { createTask, deleteTask, updateTask, listTasks } from "./task";
import { getMe, updateUser } from "./user";

export const apiRouter = Router()
  // auth routes
  .post("/auth/login", login)
  .post("/auth/signup", signup)

  // task routes
  .get("/tasks", checkAuth, listTasks)
  .post("/tasks", checkAuth, createTask)
  .put("/tasks/:id", checkAuth, updateTask)
  .delete("/tasks/:id", checkAuth, deleteTask)

  // user routes
  .get("/users", checkAuth, getMe)
  .put("/users", checkAuth, updateUser);
