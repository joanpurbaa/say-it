import express from "express";
import { signUp, login, logout } from "../controller/auth.js";
import { showUser, deleteUser } from "../controller/admin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";
import { post, showPost, showById } from "../controller/post.js";

const route = express.Router();

// auth
route.post("/signup", signUp);
route.post("/login", login);
route.post("/logout", logout);
route.get("/token", refreshToken);

// post
route.get("/showbyid/:authorid", verifyToken, showById);
route.post("/post", post);
route.get("/show", verifyToken, showPost);

// admin
route.get("/show", showUser);
route.delete("/delete/:id", deleteUser);

export default route;
