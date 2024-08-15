import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";

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
        (error, result) => {
          return result
            ? res.json({ status: 200 })
            : res.json({
                status: 401,
                error: "Wrong password",
              });
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
