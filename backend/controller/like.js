import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showLikes = async (req, res) => {
  try {
    await prisma.likes.findMany({
      include: {
        _count: {
          select: {
            likes: {
              where: {
                postId: req.params.postId,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const like = async (req, res) => {
  try {
    await prisma.likes.create({
      data: {
        userId: req.body.userId,
        postId: req.body.postId,
      },
    });
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
