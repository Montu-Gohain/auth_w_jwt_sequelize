import { Request, Response } from "express";
import { Todo } from "../db/connection_w_models";

export const create_todo = async (req: Request, res: Response) => {
  try {
    const { task, userId } = req.body;

    if (!task || !userId) {
      return res.sendStatus(400);
    }

    const newTodo = await Todo.create({
      task,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Todo Created successfully.",
      data: newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later.",
    });
  }
};

export const delete_todo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    await Todo.destroy({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Task got deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong,please Try again later.",
    });
  }
};

export const update_todo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, is_complete } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Please provide the todo id",
      });
    }

    if (!task && !is_complete) {
      return res.status(400).json({
        message: "Please provide at least one value to update.",
      });
    }

    if (task) {
      await Todo.update(
        { task },
        {
          where: {
            id,
          },
        }
      );
    } else if (is_complete !== undefined) {
      await Todo.update(
        {
          is_complete,
        },
        {
          where: { id },
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Todo Updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later.",
    });
  }
};
