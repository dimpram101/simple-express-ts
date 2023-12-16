import { Router } from "express";
import { getUserByIdController, deleteUserController, editUserController, updatePasswordController, updateAvatarController } from "../controllers";
import { checkSelfEditing, verifyToken } from "../middlewares";

const userRoute = Router();

userRoute.get("/:id", getUserByIdController);
userRoute.put("/:id", checkSelfEditing, editUserController);
userRoute.delete("/:id", deleteUserController);
userRoute.post("/change-avatar", updateAvatarController);
userRoute.post("/change-password", updatePasswordController);


export default userRoute;