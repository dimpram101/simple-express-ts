import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};