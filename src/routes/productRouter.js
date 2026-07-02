import express from "express";
import auth from "../middlewares/auth.js";
import productService from "../services/productService.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const getAllProducts = await productService.getAll({
      ...req.body,
    });
    return res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    return res.json(product);
  } catch (error) {
    return next(error);
  }
});

productRouter.post("/", auth.verifyAccessToken, async (req, res, next) => {
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
});

productRouter.put(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyProductAuth,
  async (req, res, next) => {
    try {
      const updateProduct = await productService.update({
        id: req.params.id,
        ...req.body,
      });
      return res.json(updateProduct);
    } catch (error) {
      return next(error);
    }
  },
);

productRouter.delete(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyProductAuth,
  async (req, res, next) => {
    try {
      const deleteProduct = await productService.deleteById(req.params.id);
      return res.json(deleteProduct);
    } catch (error) {
      return next(error);
    }
  },
);

export default productRouter;
