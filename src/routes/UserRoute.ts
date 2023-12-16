import { Router } from "express";
import { getUserByIdController, deleteUserController, editUserController, updatePasswordController, updateAvatarController } from "../controllers";

const userRoute = Router();

userRoute.get("/:id", getUserByIdController);
userRoute.put("/:id", editUserController);
userRoute.delete("/:id", deleteUserController);
userRoute.post("/change-avatar", updateAvatarController);
userRoute.post("/change-password", updatePasswordController);


export default userRoute;