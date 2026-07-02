import prisma from "../config/prisma.js";

async function getAll() {
  const products = await prisma.product.findMany();
  return products;
}

async function getById(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  return product;
}

async function save(product) {
  const createProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      images: product.images,
      ownerId: product.ownerId,
    },
  });
  return createProduct;
}

async function update(product) {
  const updateProduct = await prisma.product.update({
    where: {
      id: Number(product.id),
    },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      images: product.images,
    },
  });
  return updateProduct;
}

async function deleteById(id) {
  const deleteProduct = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  return deleteProduct;
}

export default {
  getAll,
  getById,
  save,
  update,
  deleteById,
};
