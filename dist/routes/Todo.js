"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../controllers/Todo");
exports.default = (router) => {
    router.post("/todo", Todo_1.create_todo);
    router.delete("/todo/:id", Todo_1.delete_todo);
    router.patch("/todo/:id", Todo_1.update_todo);
};
//# sourceMappingURL=Todo.js.map