import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResList } from "./types/res-list";

type CreateListReqBody = {
  title: string;
  order: number;
};

type CreateListResBody = {
  list: ResList;
};

export const createList = async (
  req: Request<{}, {}, CreateListReqBody>,
  res: Response<CreateListResBody | ErrorResBody>
) => {
  let list;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    list = await prisma.list.create({
      data: {
        ...req.body,
        creatorId: req.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to create list" });
  }
  return res.status(201).json({
    list: {
      id: list.id,
      title: list.title,
      order: list.order,
    },
  });
};
