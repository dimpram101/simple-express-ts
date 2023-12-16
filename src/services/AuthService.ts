import { UserLoginModel, UserRegisterModel } from "../models/User";
import { PrismaClient } from "@prisma/client";
import { ErrorResponse } from "../models/ErrorModel";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);

export const RegisterService = async ({
  email,
  name,
  phone_number,
  password,
  confirm_password,
}: UserRegisterModel) => {
  if (password!.length < 8) {
    throw new ErrorResponse(
      400,
      ["password"],
      "Password must be at least 8 characters"
    );
  }

  if (password !== confirm_password) {
    throw new ErrorResponse(
      400,
      ["password"],
      "Password and confirm password must be the same"
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new ErrorResponse(400, ["email"], "Email already exist");
  }

  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      phone_number,
      password: hashedPassword,
    },
  });

  return user;
};

export const LoginService = async ({ email, password }: UserLoginModel) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ErrorResponse(
      400,
      ["email", "password"],
      "Email or password is incorrect"
    );
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    throw new ErrorResponse(
      400,
      ["email", "password"],
      "Email or password is incorrect"
    );
  }

  return user;
};
