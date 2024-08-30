import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showLikesById = async (req, res) => {
  try {
    const result = await prisma.likes.findMany({
      where: {
        postId: req.params.postid,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const like = async (req, res) => {
  try {
    const likeValidate = await prisma.likes.findMany({
      where: {
        userId: req.body.userId,
      },
    });

    if (likeValidate[0]) {
      await prisma.likes.delete({
        where: {
          userId: req.body.userId,
        },
      });
    } else {
      await prisma.likes.create({
        data: {
          userId: req.body.userId,
          postId: req.body.postId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllLikes = async (req, res) => {
  try {
    await prisma.likes.deleteMany();
  } catch (error) {
    console.log(error);
  }
};
