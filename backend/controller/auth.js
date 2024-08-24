import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { jwtDecode } from "jwt-decode";

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

      const emailToken = jwt.sign(
        { email: req.body.email, username: req.body.username },
        process.env.ACCESS_TOKEN
      );

      res.cookie("emailToken", emailToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ status: 201 });
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendOtp = async (req, res) => {
  const emailToken = jwtDecode(req.cookies.emailToken);
  const otp = Math.floor(1000 + Math.random() * 9000);

  const emailTokenDatas = await prisma.user.findFirst({
    where: {
      email: emailToken.email,
    },
  });

  await prisma.user.updateMany({
    where: {
      id: emailTokenDatas.id,
    },
    data: {
      otp: otp,
    },
  });

  const html = `
    <h1 style="color: #f59e0b; text-align: center;">Hi ${emailToken.username}, i am Joan, the creator!</h1>
    <br/>
    <p style="font-size: 18px; text-align: center;">Congratulations and thank you for registering on our platform. Have fun and here is your <b>OTP</b> code! 🥳</p>
    <br/>
    <h1 style="font-size: 70px; color: #f59e0b; text-align: center;">${otp}</h1>`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "joanpurba4@gmail.com",
      pass: "ktjzygghqydnyvot",
    },
  });

  await transporter.sendMail({
    from: {
      name: "Say it!",
      address: "joanpurba4@gmail.com",
    },
    to: emailToken.email,
    subject: "Your OTP Code",
    html,
  });

  res.json({ status: 200 });
};

export const verifyOtp = async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      where: {
        otp: req.body.otp,
      },
    });

    result[0]
      ? res.json({ status: 200 })
      : res.json({ status: 401, error: "Wrong OTP code" });
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
