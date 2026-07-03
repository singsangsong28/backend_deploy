import prisma from "../config/prisma.js";

async function getAll() {
  const comments = await prisma.comment.findMany();
  return comments;
}

async function getById(id) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: Number(id),
    },
  });
  return comment;
}
async function save(comment) {
  const createdComment = await prisma.comment.create({
    data: {
      content: comment.content,
      user: {
        connect: { id: comment.ownerId },
      },
      ...(comment.productId && {
        product: { connect: { id: Number(comment.productId) } },
      }),
      ...(comment.articleId && {
        article: { connect: { id: Number(comment.articleId) } },
      }),
    },
  });
  return createdComment;
}

async function update(id, comment) {
  const updateComment = await prisma.comment.update({
    where: {
      id: Number(id),
    },
    data: {
      content: comment.content,
    },
  });
  return updateComment;
}

async function deleteById(id) {
  const deleteComment = await prisma.comment.delete({
    where: {
      id: Number(id),
    },
  });
  return deleteComment;
}

export default {
  getAll,
  getById,
  save,
  update,
  deleteById,
};
