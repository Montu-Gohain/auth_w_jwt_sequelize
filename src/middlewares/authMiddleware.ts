import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers";
import * as dotenv from "dotenv";
import { merge } from "lodash";

dotenv.config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Deined",
    });
  }
  try {
    const verified = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);

    merge(req, { user_verified: verified });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
