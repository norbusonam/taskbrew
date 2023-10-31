"use server";

import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTask(id: string) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  // delete task
  await prisma.task.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  // revalidate cache
  revalidatePath("/list");
  revalidatePath("/board");
  revalidatePath("/calendar");
}
