export interface BaseUserModel {
  id?: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRegisterModel extends BaseUserModel {
  confirm_password: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}