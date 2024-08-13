import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showUser = async (req, res) => {
  try {
    const result = await prisma.user.findMany();

    res.json(result).send(200);
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

    return res.send(200);
  } catch (error) {
    console.log(error);
  }
};
