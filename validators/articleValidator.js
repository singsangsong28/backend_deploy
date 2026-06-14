import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요."),
  content: z.string().trim().min(1, "내용을 입력해주세요."),
  ownerId: z.number().int().positive("ownerId가 필요합니다."),
  image: z.string().trim().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();
