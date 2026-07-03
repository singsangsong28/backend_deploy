import prisma from "../config/prisma.js";

async function getAll() {
  const articles = await prisma.article.findMany();
  return articles;
}

async function getById(id) {
  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
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
