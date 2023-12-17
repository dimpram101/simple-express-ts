import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import { authRoute, roleRoute, userRoute } from "./routes";
import { verifyToken, errorHandler } from "./middlewares";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(fileupload());
app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/user/", verifyToken, userRoute);
app.use("/api/role/", roleRoute);

app.use(errorHandler);

export default app;