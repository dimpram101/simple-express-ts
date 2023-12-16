import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/ErrorMiddleware";
import { authRoute, userRoute } from "./routes";
import fileupload from "express-fileupload";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(fileupload());
app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/user/", userRoute);

app.use(errorHandler);

export default app;
