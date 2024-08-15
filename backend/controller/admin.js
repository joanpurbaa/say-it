import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showUser = async (req, res) => {
  try {
    const result = await prisma.user.findMany();

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
