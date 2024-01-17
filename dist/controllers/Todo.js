"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_todo = exports.delete_todo = exports.create_todo = void 0;
const connection_w_models_1 = require("../db/connection_w_models");
const create_todo = async (req, res) => {
    try {
        const { task, userId } = req.body;
        if (!task || !userId) {
            return res.sendStatus(400);
        }
        const newTodo = await connection_w_models_1.Todo.create({
            task,
            userId,
        });
        return res.status(201).json({
            success: true,
            message: "Todo Created successfully.",
            data: newTodo,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
        });
    }
};
exports.create_todo = create_todo;
const delete_todo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendStatus(400);
        }
        await connection_w_models_1.Todo.destroy({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: "Task got deleted.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong,please Try again later.",
        });
    }
};
exports.delete_todo = delete_todo;
const update_todo = async (req, res) => {
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
            await connection_w_models_1.Todo.update({ task }, {
                where: {
                    id,
                },
            });
        }
        else if (is_complete !== undefined) {
            await connection_w_models_1.Todo.update({
                is_complete,
            }, {
                where: { id },
            });
        }
        return res.status(200).json({
            success: true,
            message: "Todo Updated successfully.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
        });
    }
};
exports.update_todo = update_todo;
//# sourceMappingURL=Todo.js.map