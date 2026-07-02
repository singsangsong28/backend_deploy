import productRepository from "../repositories/productRepository.js";

async function getAll() {
  return productRepository.getAll();
}

async function getById(id) {
  return productRepository.getById(id);
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
