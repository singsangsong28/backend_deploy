import articleRepository from "../repositories/articleRepository.js";

async function getAll() {
  return articleRepository.getAll();
}

async function getById(id) {
  return articleRepository.getById(id);
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
