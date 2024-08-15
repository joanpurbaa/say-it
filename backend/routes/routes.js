import express from "express";
import { signUp, login } from "../controller/auth.js";
import { showUser, deleteUser } from "../controller/admin.js";

const route = express.Router();

// auth
route.post("/signup", signUp);
route.post("/login", login);

// admin
route.get("/show", showUser);
route.delete("/delete/:id", deleteUser);

export default route;
