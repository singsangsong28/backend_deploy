import productRepository from "../repositories/productRepository.js";

async function getAll(
  userId,
  { page = 1, pageSize = 10, limit, orderBy, keyword } = {},
) {
  const take = limit ? Number(limit) : Number(pageSize);
  const skip = limit ? 0 : (Number(page) - 1) * take;
  const orderByClause =
    orderBy === "favorite" ? { favoriteCount: "desc" } : { createdAt: "desc" };

  const { products, totalCount } = await productRepository.getAll(userId, {
    skip,
    take,
    orderBy: orderByClause,
    keyword,
  });

  const list = products.map(({ likes, ...rest }) => ({
    ...rest,
    isLiked: likes.length > 0,
  }));

  return { list, totalCount };
}

async function getById(id, userId) {
  const product = await productRepository.getById(id, userId);
  if (!product) return null;

  const { likes, ...rest } = product;
  return { ...rest, isLiked: likes.length > 0 };
}

async function create(product) {
  return productRepository.save(product);
}

async function update(product) {
  return productRepository.update(product);
}

async function deleteById(id) {
  return productRepository.deleteById(id);
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
