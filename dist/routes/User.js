"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../controllers/User");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.default = (router) => {
    router.get("/users", User_1.get_all_users);
    router.post("/login", User_1.login_user);
    router.post("/register", User_1.register_user);
    router.get("/protected", authMiddleware_1.authenticateToken, User_1.access_protected_route);
    router.post("/renew", User_1.renew_access_token);
    router.get("/user/:id", authMiddleware_1.authenticateToken, User_1.get_user_w_id);
};
//# sourceMappingURL=User.js.map