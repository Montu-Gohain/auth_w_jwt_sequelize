import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URI;

export const sequelize = new Sequelize(DB_URL);
// Todo : Let's connect with our database.

export default async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected with the database 🗄️🗄️🗄️.");
  } catch (error) {
    console.log(error);
  }
};
