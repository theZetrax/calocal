import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { User } from "@app/models/entity/User";
import authMiddleware from "@app/middleware/auth";

const UserRouter = Router();

UserRouter.use(authMiddleware);

UserRouter.get("/", async (req: Request, res: Response) => {
  const users = await getRepository(User).find();

  return res.json({
    success: "Users loaded successfully",
    data: {
      users,
    },
    user: res.locals.user,
  });
});

UserRouter.get("/account", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const user = await getRepository(User).findOne({ where: { id: userId } });
    return res.json({
      user,
    });
  } catch (err) {
    console.error("Getting user information failed");
  }
});

UserRouter.post("/logout", async (req: Request, res: Response) => {
  return res.clearCookie("user-token").send();
});

export default UserRouter;
