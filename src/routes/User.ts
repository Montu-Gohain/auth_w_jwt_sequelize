import { Router } from "express";
import {
  login_user,
  register_user,
  access_protected_route,
  renew_access_token,
} from "../controllers/User";
import { authenticateToken } from "../middlewares/authMiddleware";

export default (router: Router) => {
  router.post("/login", login_user);
  router.post("/register", register_user);
  router.get("/protected", authenticateToken, access_protected_route);
  router.post("/renew", renew_access_token);
};
