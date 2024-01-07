import { Router } from "express";
import { create_todo, delete_todo, update_todo } from "../controllers/Todo";

export default (router: Router) => {
  router.post("/todo", create_todo);
  router.delete("/todo/:id", delete_todo);
  router.patch("/todo/:id", update_todo);
};
