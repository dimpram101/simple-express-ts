import { PrismaClient } from "@prisma/client";
import { ErrorResponse } from "../models/ErrorModel";
import { BaseUserModel, UserUpdatePasswordModel } from "../models/User";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ErrorResponse(404, ["user"], "User not found");
  }

  return user;
};

export const editUserService = async (
  id: string,
  { name, email, phone_number }: BaseUserModel
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new ErrorResponse(404, ["user"], "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
      phone_number,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
    },
  });

  return updatedUser;
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new ErrorResponse(404, ["user"], "User not found");
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return deletedUser;
};

export const UpdatePasswordService = async (
  id: string,
  { current_password, new_password, confirm_password }: any
) => {
  console.log(id, current_password, new_password, confirm_password)
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new ErrorResponse(404, ["user"], "User not found");
  }

  const passwordMatch = bcrypt.compareSync(current_password, user.password);

  if (!passwordMatch) {
    throw new ErrorResponse(400, ["password"], "Your current password is incorrect.");
  }

  if (new_password !== confirm_password) {
    throw new ErrorResponse(
      400,
      ["password", "confirm_password"],
      "Password did not match with Confirm Password"
    );
  }

  const password = bcrypt.hashSync(new_password, salt);

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      password,
    }
  });
};
