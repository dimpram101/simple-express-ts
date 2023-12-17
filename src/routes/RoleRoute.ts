import { Router } from "express";
import { CreateRoleController, DeleteRoleController, EditRoleController, GetAllRolesController } from "../controllers/RoleController";

const roleRoute = Router();

roleRoute.get("/", GetAllRolesController);
roleRoute.post("/", CreateRoleController);
roleRoute.put("/:id", EditRoleController);
roleRoute.delete("/:id", DeleteRoleController);

export default roleRoute;