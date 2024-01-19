"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_pm_list = void 0;
const pm_data_1 = require("../db/pm_data");
// Todo : In this controller we'll have controller for PrimeMinister route
const get_pm_list = (_, res) => {
    setTimeout(() => {
        res.json({
            success: true,
            message: "These are all India's Prime Minister",
            data: pm_data_1.PM_LIST,
        });
    }, 1500);
};
exports.get_pm_list = get_pm_list;
//# sourceMappingURL=PrimeMinister.js.map