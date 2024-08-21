import express from "express";
import cors from "cors";
import "dotenv/config";
import route from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(route);

app.listen(port);
