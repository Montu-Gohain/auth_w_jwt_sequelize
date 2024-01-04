import { Router } from "express";
import User from "./User";

const router = Router();

export default (): Router => {
  User(router);
  return router;
};
