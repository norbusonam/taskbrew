import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";

type DeleteTaskReqParams = {
  id: string;
};

export const deleteTask = async (
  req: Request<DeleteTaskReqParams>,
  res: Response<ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    await prisma.task.delete({
      where: {
        creatorId_id: {
          creatorId: req.userId,
          id: req.params.id,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete task" });
  }
  return res.status(204).send();
};
