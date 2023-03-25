import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResList } from "./types/res-list";

type UpdateListReqParams = {
  id: string;
};

type UpdateListReqBody = {
  title?: string;
  order?: number;
};

type UpdateListResBody = {
  list: ResList;
};

export const updateList = async (
  req: Request<UpdateListReqParams, {}, UpdateListReqBody>,
  res: Response<UpdateListResBody | ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    await prisma.list.update({
      where: {
        creatorId_id: {
          creatorId: req.userId,
          id: req.params.id,
        },
      },
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update list" });
  }
  return res.status(204).send();
};
