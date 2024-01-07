import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { STRING, UUID } from "sequelize";
import { alter_all_tables, sync_all_tables_forced } from "../helpers";
import { User_ } from "../types";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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
      type: UUID,
      defaultValue: () => uuidv4(),
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
    timestamps: true,
  }
);

User.beforeCreate(async (_user_: User_) => {
  const salt = await bcrypt.genSalt(10);
  _user_.password = await bcrypt.hash(_user_.password, salt);
});

// sync_all_tables_forced();
// alter_all_tables();
