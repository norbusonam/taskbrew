"use server";

import { NewTask, db } from "@/lib/database";

export async function createTask(task: NewTask) {
  await db.insertInto("task").values(task).execute();
}

export async function getTasks() {
  return await db.selectFrom("task").selectAll().execute();
}
