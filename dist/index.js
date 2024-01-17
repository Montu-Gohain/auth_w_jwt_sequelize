"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const connection_w_models_1 = __importDefault(require("./db/connection_w_models"));
const routes_1 = __importDefault(require("./routes"));
const express_rate_limit_1 = require("express-rate-limit");
(0, connection_w_models_1.default)(); // Connecting our database.
dotenv.config();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // Here it means 15 minutes
    limit: 1000, // Within a span of 15 minutes he can make max of 100 requests.
    standardHeaders: true,
    legacyHeaders: false,
});
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(limiter);
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("tiny"));
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => console.log(`Server is running 🚀🚀🚀 at http://localhost:${PORT}`));
// Todo : Let's define some routes.
app.get("/", (_, res) => {
    res.send({
        success: true,
        msg: "Hey You've Reached the Home route 🏠🏠🚀🚀🔥🔥",
    });
});
app.use("/api", (0, routes_1.default)());
//# sourceMappingURL=index.js.map