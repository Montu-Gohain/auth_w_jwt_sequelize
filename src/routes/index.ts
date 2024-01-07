import { Router } from "express";
import User from "./User";
import Todo from "./Todo";

const router = Router();

export default (): Router => {
  User(router);
  Todo(router);
  return router;
};
