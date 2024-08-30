import express from "express";
import {
  signUp,
  login,
  logout,
  sendOtp,
  verifyOtp,
} from "../controller/auth.js";
import { showUser, deleteUser, deleteAllPosts } from "../controller/admin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";
import { post, showPost, showById } from "../controller/post.js";
import { deleteAllLikes, like, showLikes } from "../controller/like.js";

const route = express.Router();

// auth
route.post("/signup", signUp);
route.post("/sendotp", sendOtp);
route.post("/verifyotp", verifyOtp);
route.post("/login", login);
route.post("/logout", logout);
route.get("/token", refreshToken);

// post
route.get("/showbyid/:authorid", verifyToken, showById);
route.post("/post", post);
route.get("/show", verifyToken, showPost);

// like
route.get("/showlikebyid/:postId", showLikes);
route.post("/like", like);
route.delete("/deleteallikes", deleteAllLikes);

// admin
route.get("/show", showUser);
route.delete("/delete/:id", deleteUser);
route.delete("/deleteallposts", deleteAllPosts);

export default route;
