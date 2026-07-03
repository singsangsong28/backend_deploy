import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/product", productRouter);
app.use("/", userRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`서바가 ${port} 에서 동작 중 입니다!`);
});
