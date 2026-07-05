import prisma from "../config/prisma.js";

async function getAll(userId) {
  const articles = await prisma.article.findMany({
    include: {
      likes: {
        where: { userId: userId ?? -1 },
      },
    },
  });
  return articles;
}

async function getById(id, userId) {
  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
    include: {
      comments: true,
      likes: { where: { userId: userId ?? -1 } },
    },
  });
  return article;
}

async function save(article) {
  const createArticle = await prisma.article.create({
    data: {
      title: article.title,
      content: article.content,
      likeCount: article.likeCount,
      image: article.image,
      ownerId: article.ownerId,
    },
  });
  return createArticle;
}

async function update(article) {
  const updateArticle = await prisma.article.update({
    where: {
      id: Number(article.id),
    },
    data: {
      title: article.title,
      content: article.content,
      likeCount: article.likeCount,
      image: article.image,
    },
  });
  return updateArticle;
}

async function deleteById(id) {
  const deleteArticle = await prisma.article.delete({
    where: {
      id: Number(id),
    },
  });
  return deleteArticle;
}

export default {
  getAll,
  getById,
  save,
  update,
  deleteById,
};
