import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const commentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: 댓글 API
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: 댓글 목록 조회
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: 댓글 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
commentRouter.get("/", commentController.getAll);

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: 댓글 상세 조회
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 상세
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
commentRouter.get("/:id", commentController.getById);

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: 댓글 등록
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: 등록된 댓글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 필요
 */
commentRouter.post("/", auth.verifyAccessToken, commentController.create);

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: 댓글 수정
 *     tags: [Comment]
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
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: 수정된 댓글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 접근 제한 (소유자가 아님)
 */
commentRouter.put(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyCommentAuth,
  commentController.update,
);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comment]
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
commentRouter.delete(
  "/:id",
  auth.verifyAccessToken,
  auth.verifyCommentAuth,
  commentController.deleteById,
);

export default commentRouter;
