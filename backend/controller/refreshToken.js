import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const refreshTokenFromDb = await prisma.user.findMany({
      where: {
        refreshToken: refreshToken,
      },
    });

    if (!refreshTokenFromDb) return res.sendStatus(403);

    jwt.verify(
      refreshTokenFromDb[0].refreshToken,
      process.env.REFRESH_TOKEN,
      (error, result) => {
        if (error) return res.sendStatus(403);

        const payload = {
          id: refreshTokenFromDb[0].id,
          email: refreshTokenFromDb[0].email,
          username: refreshTokenFromDb[0].username,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
          expiresIn: "15s",
        });

        res.json(accessToken);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
