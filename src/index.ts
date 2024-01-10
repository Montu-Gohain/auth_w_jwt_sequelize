import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db_connection from "./db/connection_w_models";
import routes from "./routes";
import { rateLimit } from "express-rate-limit";

db_connection(); // Connecting our database.
dotenv.config();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Here it means 15 minutes
  limit: 1000, // Within a span of 15 minutes he can make max of 100 requests.
  standardHeaders: true,
  legacyHeaders: false,
});

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(limiter);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(compression());
app.use(morgan("tiny"));

const server = http.createServer(app);

const PORT = process.env.PORT || 6000;
server.listen(PORT, () =>
  console.log(`Server is running 🚀🚀🚀 at http://localhost:${PORT}`)
);

// Todo : Let's define some routes.

app.get("/", (_: Request, res: Response) => {
  res.send({
    success: true,
    msg: "Hey You've Reached the Home route 🏠🏠🚀🚀🔥🔥",
  });
});

app.use("/api", routes());
