"use server";

import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function reorderTasks(
  type: "LIST" | "BOARD",
  body: { id: string; order: number }[],
) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  // validate type
  if (type !== "LIST" && type !== "BOARD") {
    return new Response(null, { status: 400 });
  }

  // update order
  await Promise.all(
    body.map((task: { id: string; order: number }) =>
      prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          [type === "LIST" ? "listOrder" : "boardOrder"]: task.order,
        },
      }),
    ),
  );

  // revalidate cache
  revalidatePath("/list");
  revalidatePath("/board");
  revalidatePath("/calendar");
}
