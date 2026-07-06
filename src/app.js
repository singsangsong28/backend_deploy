import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import errorHandler from "./middlewares/errorHandler.js";
import articleRouter from "./routes/articleRouter.js";
import commentRouter from "./routes/commentRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/products", productRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);
app.use("/", userRouter);

app.use(errorHandler);

export default app;
