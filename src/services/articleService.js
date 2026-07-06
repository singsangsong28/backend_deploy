import articleRepository from "../repositories/articleRepository.js";

async function getAll(
  userId,
  { page = 1, pageSize = 10, limit, orderBy, keyword } = {},
) {
  const take = limit ? Number(limit) : Number(pageSize);
  const skip = limit ? 0 : (Number(page) - 1) * take;
  const orderByClause =
    orderBy === "like" ? { likeCount: "desc" } : { createdAt: "desc" };

  const { articles, totalCount } = await articleRepository.getAll(userId, {
    skip,
    take,
    orderBy: orderByClause,
    keyword,
  });

  const list = articles.map(({ likes, ...rest }) => ({
    ...rest,
    isLiked: likes.length > 0,
  }));

  return { list, totalCount };
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
