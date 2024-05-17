"use server";

import { NewTask, db } from "@/lib/database";

export async function createTask(task: NewTask) {
  await db.insertInto("task").values(task).execute();
}

export async function getTasks() {
  return await db.selectFrom("task").selectAll().execute();
}

export async function deleteTask(id: number) {
  return await db
    .deleteFrom("task")
    .where("id", "=", id)
    .returningAll()
    .execute();
}
