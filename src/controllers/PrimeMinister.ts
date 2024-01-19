import { Request, Response } from "express";
import { PM_LIST } from "../db/pm_data";
// Todo : In this controller we'll have controller for PrimeMinister route

export const get_pm_list = (_: Request, res: Response) => {
  setTimeout(() => {
    res.json({
      success: true,
      message: "These are all India's Prime Minister",
      data: PM_LIST,
    });
  }, 1500);
};
