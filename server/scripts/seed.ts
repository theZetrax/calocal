import "reflect-metadata";
import { createConnection } from "typeorm";
import SeedDatabase from './seeder';

console.info("Connecting to database...");
createConnection()
  .then(async () => {
    console.info("Successfully connected to database.");
    console.log("Seeding database please wait...");

    await SeedDatabase();
    console.log("Database seed successful");
  })
  .catch(() => console.error("Failed to connect to database."));
