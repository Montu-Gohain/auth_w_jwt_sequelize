import { sequelize } from "../db/connection_w_models";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const sync_all_tables_forced = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("All tables are synced with the models 📅📅📅");
  } catch (error) {
    console.log(error);
  }
};

export const alter_all_tables = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All tables are altered with the models 📅📅📅");
  } catch (error) {
    console.log(error);
  }
};

export const generate_access_token = (userId: number) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15s",
  });
};

export const generate_refresh_token = (userId: number) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "365d",
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
