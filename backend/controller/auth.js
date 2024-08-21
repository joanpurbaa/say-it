import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signUp = async (req, res) => {
  try {
    const emailFromDb = await prisma.user.findMany({
      where: {
        email: req.body.email,
      },
    });

    const usernameFromDb = await prisma.user.findMany({
      where: {
        username: req.body.username,
      },
    });

    const salt = 10;

    if (!validator.isEmail(req.body.email)) {
      return res.json({ status: 401, error: "Type the email correctly" });
    }

    if (emailFromDb[0]) {
      return res.json({ status: 401, error: "Email has been used" });
    }

    if (usernameFromDb[0]) {
      return res.json({ status: 401, error: "Username has been used" });
    }

    bcrypt.hash(req.body.password, salt, async (error, hash) => {
      await prisma.user.create({
        data: {
          email: req.body.email,
          username: req.body.username,
          password: hash,
        },
      });

      return res.json({ status: 201 });
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const dataFromDb = await prisma.user.findMany({
      where: {
        email: req.body.email,
        username: req.body.username,
      },
    });

    const emailFromDb = await prisma.user.findMany({
      where: {
        email: req.body.email,
      },
    });

    const usernameFromDb = await prisma.user.findMany({
      where: {
        username: req.body.username,
      },
    });

    if (!validator.isEmail(req.body.email)) {
      return res.json({ status: 401, error: "Type the email correctly" });
    }

    if (!dataFromDb[0]) {
      return res.json({ status: 401, error: "Wrong email or username" });
    }

    if (!emailFromDb[0]) {
      return res.json({ status: 401, error: "Wrong email" });
    }

    if (!usernameFromDb[0]) {
      return res.json({ status: 401, error: "Wrong username" });
    }

    if (emailFromDb[0] && usernameFromDb[0] && dataFromDb[0]) {
      bcrypt.compare(
        req.body.password,
        emailFromDb[0].password,
        async (error, result) => {
          if (result) {
            const payload = {
              id: emailFromDb[0].id,
              email: emailFromDb[0].email,
              username: emailFromDb[0].username,
            };

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
              expiresIn: "15s",
            });

            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
              expiresIn: "1d",
            });

            await prisma.user.update({
              where: {
                id: emailFromDb[0].id,
              },
              data: {
                refreshToken: refreshToken,
              },
            });

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken, status: 200 });
          } else {
            res.json({
              status: 401,
              error: "Wrong password",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }

  // !production
  // catch (error) {
  //   return res.json({ status: 400, error: "Bad request" });
  // }
};

export const logout = async (req, res) => {
  try {
    await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        refreshToken: null,
      },
    });

    res.cookie("refreshToken", "", {
      httpOnly: true,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
