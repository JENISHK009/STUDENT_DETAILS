import express from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";

const server = express();

const PORT =  5000;
const HOST =  "localhost";

require("./src/config/connection");
server.use(urlencoded({ extended: true }));
server.use(json());

// Enable the CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
server.use(cors());

import { studentRoute } from "./src/routes";

server.use("/studentdetails", studentRoute);


server.listen(PORT, () => {
  console.log(`API Running at http://${HOST}:${PORT}/`);
});
