import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { User } from "@app/models/entity/User";
import authMiddleware from "@app/middleware/auth";

const UsersRouter = Router();

UsersRouter.use(authMiddleware);

UsersRouter.get("/", async (req: Request, res: Response) => {
  const users = await getRepository(User).find();

  res.json({
    success: "Users loaded successfully",
    data: {
      users,
    },
    user: res.locals.user,
  });
});

UsersRouter.post("/create", async (req: Request, res: Response) => {
  console.log({
    headers: req.headers,
    body: req.body,
  });

  res.json({
    message: "unsuccessfull",
  });
});

export default UsersRouter;
