import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";

type DeleteListReqParams = {
  id: string;
};

export const deleteList = async (
  req: Request<DeleteListReqParams>,
  res: Response<ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    await prisma.list.delete({
      where: {
        creatorId_id: {
          creatorId: req.userId,
          id: req.params.id,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete list" });
  }
  return res.status(204).send();
};
