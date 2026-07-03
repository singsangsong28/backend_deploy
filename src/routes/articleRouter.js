import express from "express";
import articleController from "../controllers/articleController.js";
import auth from "../middlewares/auth.js";

const articleRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Article
 *   description: 자유게시판 API
 */

/**
 * @swagger
 * /article:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: 게시글 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articleRouter.get("/", articleController.getAll);

/**
 * @swagger
 * /article/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 상세
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
articleRouter.get("/:id", articleController.getById);

/**
 * @swagger
 * /article:
 *   post:
 *     summary: 게시글 등록
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       201:
 *         description: 등록된 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: 인증 필요
 */
articleRouter.post("/", auth.verifyAccessToken, articleController.create);

/**
 * @swagger
 * /article/{id}:
 *   put:
 *     summary: 게시글 수정
 *     tags: [Article]
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
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       200:
 *         description: 수정된 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 접근 제한 (소유자가 아님)
 */
articleRouter.put(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyArticleAuth,
  articleController.update,
);

/**
 * @swagger
 * /article/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Article]
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
articleRouter.delete(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyArticleAuth,
  articleController.deleteById,
);

export default articleRouter;
