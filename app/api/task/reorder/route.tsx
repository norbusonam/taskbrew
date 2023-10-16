import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
  }

  // validate type
  const body = await req.json();
  if (body.type !== "LIST" && body.type !== "BOARD") {
    return new Response(null, { status: 400 });
  }

  // update order
  await Promise.all(
    body.tasks.map((task: { id: string; order: number }) =>
      prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          [body.type === "LIST" ? "listOrder" : "boardOrder"]: task.order,
        },
      }),
    ),
  );

  return new Response(null, {
    status: 204,
  });
}
