import prisma from "@taskbrew/prisma/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const task = await prisma.task.update({
    where: {
      id: params.id,
    },
    data: {
      title: body.title,
      completed: body.completed,
      targetDate: body.targetDate,
      duration: body.duration,
    },
  });
  return Response.json(task);
}
