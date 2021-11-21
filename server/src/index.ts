import Express from "express";
import { json as jsonparser } from "body-parser";
import cors from "cors";
import cookieparser from "cookie-parser";

/** Config Files */
import ServerConfig from "@config/server.conf.json";

/** Required by TypeORM */
import "reflect-metadata";
import { createConnection } from "typeorm";

/** Express Routers */
import Users from "@app/routes/Users";
import Auth from "@app/routes/Auth";
import FoodRecord from "@app/routes/FoodRecord";
import AdminRouter from "./routes/Admin";

console.info("Connecting to database...");
createConnection().then(async () => {
  console.info("Successfully connected to database.");

  const app = Express();

  app.use(cookieparser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(jsonparser());

  app.use("/users", Users);
  app.use("/auth", Auth);
  app.use("/records", FoodRecord);
  app.use("/admin", AdminRouter);

  app.listen(ServerConfig.port, () => {
    console.log(`Server running on: ${ServerConfig.port}`);
  });
});
