import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResList } from "./types/res-list";

type ListListsResBody = {
  lists: ResList[];
};

export const listLists = async (
  req: Request,
  res: Response<ListListsResBody | ErrorResBody>
) => {
  let lists;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    lists = await prisma.list.findMany({
      where: {
        creatorId: req.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to list lists" });
  }
  return res.status(200).json({
    lists: lists.map((list) => ({
      id: list.id,
      title: list.title,
      order: list.order,
    })),
  });
};
