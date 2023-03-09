import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResBody } from "../types";

export function checkAuth(
  req: Request,
  res: Response<ErrorResBody>,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  const token =
    authorizationHeader !== undefined && authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const jwtPayload = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    ) as jwt.JwtPayload;
    req.userId = jwtPayload.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
