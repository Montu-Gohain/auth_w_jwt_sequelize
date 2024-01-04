import { Request, Response } from "express";
import { User } from "../db/connection_w_models";
import bcrypt from "bcrypt";
import { generate_access_token, generate_refresh_token } from "../helpers";
import { get } from "lodash";

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
    res.status(500).json({ message: "Internal Server Error" });
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
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
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
