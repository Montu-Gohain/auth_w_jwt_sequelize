import { Router } from "express";
import User from "./User";
import Todo from "./Todo";
import General from "./general";

const router = Router();

export default (): Router => {
  User(router);
  Todo(router);
  General(router);
  return router;
};
