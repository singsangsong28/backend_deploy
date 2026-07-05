import articleRepository from "../repositories/articleRepository.js";

async function getAll(userId) {
  const articles = await articleRepository.getAll(userId);
  return articles.map(({ likes, ...rest }) => ({
    ...rest,
    isLiked: likes.length > 0,
  }));
}

async function getById(id, userId) {
  const article = await articleRepository.getById(id, userId);
  if (!article) return null;
  const { likes, ...rest } = article;
  return { ...rest, isLiked: likes.length > 0 };
}

async function create(article) {
  return articleRepository.save(article);
}

async function update(article) {
  return articleRepository.update(article);
}

async function deleteById(id) {
  return articleRepository.deleteById(id);
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
