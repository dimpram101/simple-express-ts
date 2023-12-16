import { Router } from "express";
import { getUserByIdController, deleteUserController, editUserController, updatePasswordController } from "../controllers";

const userRoute = Router();

userRoute.get("/:id", getUserByIdController);
userRoute.put("/:id", editUserController);
userRoute.delete("/:id", deleteUserController);
userRoute.post("/change-password", updatePasswordController);


export default userRoute;