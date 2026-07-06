import commentRepository from "../repositories/commentRepository.js";

function withWriter({ user, ...rest }) {
  return {
    ...rest,
    writer: user
      ? { id: user.id, nickname: user.nickName, image: user.image }
      : null,
  };
}

async function getAll(comment) {
  return commentRepository.getAll();
}

async function getAllByProduct(productId, limit) {
  const comments = await commentRepository.getAllByProduct(productId, limit);
  return { list: comments.map(withWriter) };
}

async function getAllByArticle(articleId, limit) {
  const comments = await commentRepository.getAllByArticle(articleId, limit);
  return { list: comments.map(withWriter) };
}

async function getById(id) {
  const comment = await commentRepository.getById(id);
  return comment ? withWriter(comment) : null;
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
