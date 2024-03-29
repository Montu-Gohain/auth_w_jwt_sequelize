import { Request, Response } from "express";
import { Todo, User, sequelize } from "../db/connection_w_models";
import bcrypt from "bcrypt";
import {
  generate_access_token,
  generate_refresh_token,
  verifyToken,
} from "../helpers";
import { get } from "lodash";
import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

export const register_user = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.sendStatus(400);
    }

    const user = await User.create({
      username,
      password,
    });

    return res.status(201).json({
      success: true,
      msg: "User Registerd successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login_user = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const the_user: any = await User.findOne({
      where: {
        username,
      },
    });

    if (!the_user) {
      return res.sendStatus(400);
    }

    // If we found the user we'll verify if the password is correct or not.

    const validPassword = await bcrypt.compare(password, the_user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password",
      });
    }

    const accessToken = generate_access_token(the_user.id);
    const refreshToken = generate_refresh_token(the_user.id);

    return res.send({
      success: true,
      msg: "User login successful.",
      userId: the_user.id,
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const access_protected_route = async (req: Request, res: Response) => {
  try {
    const verified_user = get(req, "user_verified");

    if (verified_user) {
      return res.status(200).send({
        success: true,
        message: "This is a protected route you are verified ✅✅✅",
      });
    } else {
      return res.status(401).send({
        success: true,
        message: "You are not authorized to visit this route",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const renew_access_token = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(401).json({
        message: "Refresh Token is required",
      });
    }

    const verified: any = verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (verified) {
      const newAccessToken = generate_access_token(verified.userId);

      return res.status(200).json({
        success: true,
        message: "New Access Tokens are created",
        access_token: newAccessToken,
      });
    } else {
      return res.status(401).json({
        message: "Invalid Refresh Token",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const get_all_users = async (req: Request, res: Response) => {
  try {
    const all_users_data = await User.findAll({
      attributes: {
        exclude: ["password"],
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM "todos" WHERE "todos"."userId" = "user"."id" AND "todos"."is_complete" = true)`
            ),
            "total_completed_todos",
          ],
        ],
      },
      order: [[Sequelize.literal('"total_completed_todos"'), "DESC"]],
    });

    if (!all_users_data) {
      return res.status(400).json({
        success: false,
        message: "User table doesn't exist till now.",
      });
    }
    return res.send({
      success: true,
      data: all_users_data,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const get_user_w_id = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the User id to fetch the user data",
      });
    }

    const user_data = await User.findOne({
      where: { id },
      include: Todo,
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user_data) {
      return res.status(400).json({
        message: "User doesn't exist with this Id",
      });
    }

    // Todo : Let's get the count of completed Todos

    const completed_count = await Todo.count({
      where: {
        userId: id,
        is_complete: true,
      },
    });
    return res.status(200).json({
      success: true,
      data: user_data,
      completed_task_count: completed_count,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
};
