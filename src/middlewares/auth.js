import { expressjwt } from "express-jwt";
import productRepository from "../repositories/productRepository.js";

function throwUnauthorizedError() {
  const error = new Error("권한이 없습니다");
  error.code = 401;
  throw Error;
}

const verifyAccessToken = expressjwt({
  secret: process.env.JWT_ACCESS_SECRET,
  algorithms: ["HS256"],
});

const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_REFRESH_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken,
});

async function verifyProductAuth(req, res, next) {
  const { id: productId } = req.params;
  try {
    const product = await productRepository.getById(productId);
    if (!product) {
      const error = new Error("상품을 불러올 수 없습니다.");
      error.code = 404;
      throw error;
    }
    if (product.ownerId !== req.auth.userId) {
      const error = new Error("접근이 제한됩니다.");
      error.code = 403;
      throw error;
    }
    next();
  } catch (error) {
    return next(error);
  }
}

export default {
  throwUnauthorizedError,
  verifyAccessToken,
  verifyRefreshToken,
  verifyProductAuth,
};
