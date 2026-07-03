import productService from "../services/productService.js";

async function getAll(req, res, next) {
  try {
    const getAllProduct = await productService.getAll({
      ...req.body,
    });
    return res.status(200).json(getAllProduct);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    return res.json(product);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  const { userId } = req.auth;
  try {
    const createProduct = await productService.create({
      ...req.body,
      ownerId: userId,
    });
    return res.status(201).json(createProduct);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const updateProduct = await productService.update({
      id: req.params.id,
      ...req.body,
    });
    return res.json(updateProduct);
  } catch (error) {
    return next(error);
  }
}

async function deleteById(req, res, next) {
  try {
    await productService.deleteById(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
