import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signUp = async (req, res) => {
  try {
    const newUserData = req.body;

    await prisma.user.create({
      data: {
        username: newUserData.username,
        password: newUserData.password,
      },
    });

    return res.send(201);
  } catch (error) {
    console.log(error);
  }
};