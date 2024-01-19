import { Router } from "express";
import { get_pm_list } from "../controllers/PrimeMinister";
export default (router: Router) => {
  router.get("/pm-data", get_pm_list);
};
