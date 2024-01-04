import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import db_connection from "./db/connection_w_models";
db_connection(); // Connecting our database.
dotenv.config();

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(compression());

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
