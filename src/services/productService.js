import productRepository from "../repositories/productRepository.js";

async function getAll(userId) {
  const products = await productRepository.getAll(userId);
  return products.map(({ likes, ...rest }) => ({
    ...rest,
    isLiked: likes.length > 0,
  }));
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
