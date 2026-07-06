import commentRepository from "../repositories/commentRepository.js";

async function getAll(comment) {
  return commentRepository.getAll();
}

async function getAllByProduct(productId, limit) {
  const list = await commentRepository.getAllByProduct(productId, limit);
  return { list };
}

async function getAllByArticle(articleId, limit) {
  const list = await commentRepository.getAllByArticle(articleId, limit);
  return { list };
}

async function getById(id) {
  return commentRepository.getById(id);
}

async function create(commnet) {
  return commentRepository.save(commnet);
}

async function update(id, comment) {
  return commentRepository.update(id, comment);
}

async function deleteById(id) {
  return commentRepository.deleteById(id);
}

export default {
  getAll,
  getAllByProduct,
  getAllByArticle,
  getById,
  create,
  update,
  deleteById,
};
