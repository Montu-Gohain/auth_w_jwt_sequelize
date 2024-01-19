"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("./User"));
const Todo_1 = __importDefault(require("./Todo"));
const general_1 = __importDefault(require("./general"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, User_1.default)(router);
    (0, Todo_1.default)(router);
    (0, general_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map