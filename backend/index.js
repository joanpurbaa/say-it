import express from "express";
import "dotenv/config";
import route from "./routes/routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(route);

app.listen(port);
