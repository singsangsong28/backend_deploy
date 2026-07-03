import commentRepository from "../repositories/commentRepository.js";

async function getAll(comment) {
  return commentRepository.getAll();
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
  getById,
  create,
  update,
  deleteById,
};
