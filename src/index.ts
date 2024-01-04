import http from "http";
import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(compression());

const server = http.createServer(app);

const PORT = process.env.PORT || 6000;
server.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
