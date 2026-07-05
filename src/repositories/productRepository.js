import prisma from "../config/prisma.js";

async function getAll(userId) {
  const products = await prisma.product.findMany({
    include: {
      likes: { where: { userId: userId ?? -1 } },
    },
  });
  return products;
}

async function getById(id, userId) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      comments: true,
      likes: { where: { userId: userId ?? -1 } },
    },
  });
  return product;
}

async function save(product) {
  const createProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      favoriteCount: product.favoriteCount,
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
      favoriteCount: product.favoriteCount,
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
