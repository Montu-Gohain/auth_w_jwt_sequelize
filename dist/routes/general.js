"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PrimeMinister_1 = require("../controllers/PrimeMinister");
exports.default = (router) => {
    router.get("/pm-data", PrimeMinister_1.get_pm_list);
};
//# sourceMappingURL=general.js.map