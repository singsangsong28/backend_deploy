import express from "express";
import productController from "../controllers/productController.js";
import auth from "../middlewares/auth.js";

const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: 상품 API
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: 상품 목록 조회
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: 상품 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/", productController.getAll);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 상품 상세
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: 상품을 찾을 수 없음
 */
productRouter.get("/:id", productController.getById);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: 상품 등록
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: 등록된 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: 인증 필요
 */
productRouter.post("/", auth.verifyAccessToken, productController.create);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: 상품 수정
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: 수정된 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 접근 제한 (소유자가 아님)
 */
productRouter.put(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyProductAuth,
  productController.update,
);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 접근 제한 (소유자가 아님)
 */
productRouter.delete(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyProductAuth,
  productController.deleteById,
);

export default productRouter;
