import { JwtPayload } from "jsonwebtoken";

export interface TokenModel extends JwtPayload {
  userId: string | number;
}