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
exports.verifyToken = exports.generate_refresh_token = exports.generate_access_token = exports.alter_all_tables = exports.sync_all_tables_forced = void 0;
const connection_w_models_1 = require("../db/connection_w_models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const sync_all_tables_forced = async () => {
    try {
        await connection_w_models_1.sequelize.sync({ force: true });
        console.log("All tables are synced with the models 📅📅📅");
    }
    catch (error) {
        console.log(error);
    }
};
exports.sync_all_tables_forced = sync_all_tables_forced;
const alter_all_tables = async () => {
    try {
        await connection_w_models_1.sequelize.sync({ alter: true });
        console.log("All tables are altered with the models 📅📅📅");
    }
    catch (error) {
        console.log(error);
    }
};
exports.alter_all_tables = alter_all_tables;
const generate_access_token = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
    });
};
exports.generate_access_token = generate_access_token;
const generate_refresh_token = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "365d",
    });
};
exports.generate_refresh_token = generate_refresh_token;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map