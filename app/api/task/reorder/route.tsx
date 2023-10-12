import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
  }

  // update tasks
  const body = await req.json();
  await Promise.all(
    body.tasks.map((task: { id: string; listOrder: number }) =>
      prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          listOrder: task.listOrder,
        },
      }),
    ),
  );

  return new Response(null, {
    status: 204,
  });
}
