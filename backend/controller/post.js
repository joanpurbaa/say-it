import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const post = async (req, res) => {
  try {
    const date = new Date();
    const formatDate = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);

    await prisma.posts.create({
      data: {
        authorId: req.body.authorId,
        description: req.body.description,
        date: formatDate,
      },
    });

    return res.json({ staus: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const showById = async (req, res) => {
  try {
    const result = await prisma.posts.findMany({
      where: {
        authorId: req.params.authorid,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const showPost = async (req, res) => {
  try {
    const result = await prisma.posts.findMany({
      orderBy: { id: "desc" },
      include: { author: true },
    });

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};
