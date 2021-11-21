import adminMiddleware from "@app/middleware/admin";
import { FoodRecord } from "@app/models/entity/FoodRecord";
import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";

const AdminRouter = Router();
AdminRouter.use(adminMiddleware);

AdminRouter.get("/", async (req: Request, res: Response) => {
  try {
    const foodRecords = await getRepository(FoodRecord).find({
      order: { created_at: "DESC" },
    });

    return res
      .setHeader("Access-Control-Expose-Headers", "*")
      .set("user-token", `Bearer ${res.locals.token}`)
      .json({
        records: foodRecords,
      });
  } catch (err) {
    console.error("[Fetch Records] Error", {
      err,
    });
  }
});

export default AdminRouter;
