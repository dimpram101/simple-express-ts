import { PrismaClient } from "@prisma/client";
import { ErrorResponse } from "../models";

const prisma = new PrismaClient();

export const GetAllRolesService = async () => {
  const roles = await prisma.role.findMany();

  return roles;
};

export const CreateRoleService = async (name: string) => {
  if (!name) throw new ErrorResponse(400, ["role"], "Name is required");

  const role = await prisma.role.create({ data: { name } });

  return role;
};

export const EditRoleService = async (id: number, name: string) => {
  if (!id) throw new ErrorResponse(400, ["id"], "Id is required");
  if (!name) throw new ErrorResponse(400, ["role"], "Name is required");

  const role = await prisma.role.update({ where: { id }, data: { name } });

  return role;
};

export const DeleteRoleService = async (id: number) => {
  if (!id) throw new ErrorResponse(400, ["id"], "Id is required");

  const isRoleExist = await prisma.role.findUnique({ where: { id } });

  if (!isRoleExist) {
    throw new ErrorResponse(404, ["role"], "Role not found");
  }

  const userHasRoles = await prisma.user.findMany({
    where: { role_id: id },
  });

  if (userHasRoles.length > 0) {
    throw new ErrorResponse(
      400,
      ["role"],
      "This role is assigned to one or more users"
    );
  }

  const role = await prisma.role.delete({ where: { id } });

  return role;
};
