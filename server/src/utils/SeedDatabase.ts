import { FoodRecord } from "@app/models/entity/FoodRecord";
import { User } from "@app/models/entity/User";
import { getRepository } from "typeorm";
import moment from "moment";

type FoodType = {
  name: string;
  calories: number;
  price: number;
};

const SeedData = async () => {
  try {
    const foodRepo = getRepository(FoodRecord);
    const userRepo = getRepository(User);

    const weekStart = moment().startOf("week");
    const lastWeekStart = moment().startOf("week").add(7);
    const monthStart = moment().startOf("month").subtract(7);
    const today = new Date(Date.now());

    const jimmyUser = await userRepo.findOne({ where: { username: "jimmy" } });
    const zablonUser = await userRepo.findOne({
      where: { username: "zablon" },
    });

    const jimmyDataLastMonth: Array<FoodType> = [
      {
        name: "Salad",
        calories: 200,
        price: 30,
      },
      {
        name: "Egg Sandwich",
        calories: 500,
        price: 20,
      },
      {
        name: "Apple",
        calories: 100,
        price: 10,
      },
    ];

    const jimmyDataLastWeek: Array<FoodType> = [
      {
        name: "Banana Juice",
        calories: 150,
        price: 15,
      },
      {
        name: "Roasted Chicken",
        calories: 400,
        price: 60,
      },
      {
        name: "Cupcake",
        calories: 550,
        price: 30,
      },
    ];

    const jimmyDataWeek: Array<FoodType> = [
      {
        name: "Penutbutter and Jelly Sandwich",
        calories: 350,
        price: 5,
      },
      {
        name: "Watermelon Juice",
        calories: 150,
        price: 10,
      },
      {
        name: "Candy Bar",
        calories: 600,
        price: 5,
      },
    ];

    const jimmyDataToday: Array<FoodType> = [
      {
        name: "Fruit Salad",
        calories: 200,
        price: 15,
      },
      {
        name: "Cheese Burger",
        calories: 900,
        price: 35,
      },
      {
        name: "Ice Cream",
        calories: 400,
        price: 15,
      },
    ];

    for (const data of jimmyDataLastMonth) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = monthStart.toDate();
      record.user = jimmyUser;

      await foodRepo.save(record);
    }

    for (const data of jimmyDataLastWeek) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = lastWeekStart.toDate();
      record.user = jimmyUser;

      await foodRepo.save(record);
    }

    for (const data of jimmyDataWeek) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = weekStart.toDate();
      record.user = jimmyUser;

      await foodRepo.save(record);
    }

    for (const data of jimmyDataToday) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = today;
      record.user = jimmyUser;

      await foodRepo.save(record);
    }

    // Zablon Data Seed
    const zablonDataLastMonth: Array<FoodType> = [
      {
        name: "Beef Burger",
        calories: 1100,
        price: 50,
      },
      {
        name: "Milk Shake",
        calories: 300,
        price: 10,
      },
      {
        name: "Bag of Chips",
        calories: 300,
        price: 15,
      },
    ];

    const zablonDataLastWeek: Array<FoodType> = [
      {
        name: "Egg Omlet",
        calories: 600,
        price: 20,
      },
      {
        name: "Fried Chicken",
        calories: 670,
        price: 40,
      },
      {
        name: "Apple Juice",
        calories: 200,
        price: 20,
      },
    ];

    const zablonDataWeek: Array<FoodType> = [
      {
        name: "Salad",
        calories: 200,
        price: 40,
      },
      {
        name: "Apple Juice",
        calories: 150,
        price: 15,
      },
      {
        name: "Cheese Burger",
        calories: 800,
        price: 30,
      },
    ];

    const zablonDataToday: Array<FoodType> = [
      {
        name: "Cupcake",
        calories: 300,
        price: 20,
      },
      {
        name: "Medium Pizza",
        calories: 700,
        price: 40,
      },
      {
        name: "CokaCola",
        calories: 450,
        price: 15,
      },
    ];

    for (const data of zablonDataLastMonth) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = monthStart.toDate();
      record.user = zablonUser;

      await foodRepo.save(record);
    }

    for (const data of zablonDataLastWeek) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = lastWeekStart.toDate();
      record.user = zablonUser;

      await foodRepo.save(record);
    }

    for (const data of zablonDataWeek) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = weekStart.toDate();
      record.user = zablonUser;

      await foodRepo.save(record);
    }

    for (const data of zablonDataToday) {
      const record = new FoodRecord();
      record.name = data.name;
      record.calories = data.calories;
      record.price = data.price;

      record.created_at = today;
      record.user = zablonUser;

      await foodRepo.save(record);
    }
  } catch (err) {
    console.error("Error Seeding Data", {
      err,
    });
  }
};

export default SeedData;
