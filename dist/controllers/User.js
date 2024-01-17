"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user_w_id = exports.get_all_users = exports.renew_access_token = exports.access_protected_route = exports.login_user = exports.register_user = void 0;
const connection_w_models_1 = require("../db/connection_w_models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers");
const lodash_1 = require("lodash");
const dotenv = __importStar(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv.config();
const register_user = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.sendStatus(400);
        }
        const user = await connection_w_models_1.User.create({
            username,
            password,
        });
        return res.status(201).json({
            success: true,
            msg: "User Registerd successfully",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.register_user = register_user;
const login_user = async (req, res) => {
    try {
        const { username, password } = req.body;
        const the_user = await connection_w_models_1.User.findOne({
            where: {
                username,
            },
        });
        if (!the_user) {
            return res.sendStatus(400);
        }
        // If we found the user we'll verify if the password is correct or not.
        const validPassword = await bcrypt_1.default.compare(password, the_user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                msg: "Invalid password",
            });
        }
        const accessToken = (0, helpers_1.generate_access_token)(the_user.id);
        const refreshToken = (0, helpers_1.generate_refresh_token)(the_user.id);
        return res.send({
            success: true,
            msg: "User login successful.",
            userId: the_user.id,
            tokens: { accessToken, refreshToken },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login_user = login_user;
const access_protected_route = async (req, res) => {
    try {
        const verified_user = (0, lodash_1.get)(req, "user_verified");
        if (verified_user) {
            return res.status(200).send({
                success: true,
                message: "This is a protected route you are verified ✅✅✅",
            });
        }
        else {
            return res.status(401).send({
                success: true,
                message: "You are not authorized to visit this route",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.access_protected_route = access_protected_route;
const renew_access_token = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            return res.status(401).json({
                message: "Refresh Token is required",
            });
        }
        const verified = (0, helpers_1.verifyToken)(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        if (verified) {
            const newAccessToken = (0, helpers_1.generate_access_token)(verified.userId);
            return res.status(200).json({
                success: true,
                message: "New Access Tokens are created",
                access_token: newAccessToken,
            });
        }
        else {
            return res.status(401).json({
                message: "Invalid Refresh Token",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
exports.renew_access_token = renew_access_token;
const get_all_users = async (req, res) => {
    try {
        const all_users_data = await connection_w_models_1.User.findAll({
            attributes: {
                exclude: ["password"],
                include: [
                    [
                        sequelize_1.Sequelize.literal(`(SELECT COUNT(*) FROM "todos" WHERE "todos"."userId" = "user"."id" AND "todos"."is_complete" = true)`),
                        "total_completed_todos",
                    ],
                ],
            },
            order: [[sequelize_1.Sequelize.literal('"total_completed_todos"'), "DESC"]],
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
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.get_all_users = get_all_users;
const get_user_w_id = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide the User id to fetch the user data",
            });
        }
        const user_data = await connection_w_models_1.User.findOne({
            where: { id },
            include: connection_w_models_1.Todo,
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
        const completed_count = await connection_w_models_1.Todo.count({
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
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again later.",
        });
    }
};
exports.get_user_w_id = get_user_w_id;
//# sourceMappingURL=User.js.map