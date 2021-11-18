import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";

import ServerConfig from "@config/server.conf.json";
import { User } from "@app/models/entity/User";
import GenerateToken from "@app/utils/GenerateToekn";

const USER_TOKEN = "user-token";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const payload: any = verify(token, ServerConfig.token);
    res.locals.user = payload.user;
  } catch (err) {
    return res.sendStatus(401);
  }

  const userId = res.locals.user;
  if (!(await getRepository(User).findOne({ where: { id: userId } })))
    return res.sendStatus(401);

  const newToken = GenerateToken(userId);

  res.setHeader(USER_TOKEN, newToken);

  next();
};

export default authMiddleware;
