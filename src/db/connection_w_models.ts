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
// Todo : Let's encrypt the user given password , before storing it in the DB.
User.beforeCreate(async (_user_: User_) => {
  const salt = await bcrypt.genSalt(10);
  _user_.password = await bcrypt.hash(_user_.password, salt);
});

/*
 Let's create another Model : Todo , which will include tasks.
 WE Will create an One to Many relationship model with the USER's model. i.e One user can have multiple todos that he'll create and he can access the todos that are created by himself.
*/

export const Todo = sequelize.define(
  "todo",
  {
    task: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Todo: Let's make the association here.

User.hasMany(Todo);
Todo.belongsTo(User);

// sync_all_tables_forced();
// alter_all_tables();
