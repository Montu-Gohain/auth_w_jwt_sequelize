import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { INTEGER } from "sequelize";
import { STRING } from "sequelize";
import { alter_all_tables, sync_all_tables_forced } from "../helpers";

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

// Todo : Let's define some models

export const User = sequelize.define(
  "user",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// sync_all_tables_forced();
alter_all_tables();
