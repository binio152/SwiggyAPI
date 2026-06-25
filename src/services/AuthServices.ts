import ms, { StringValue } from "ms";
import { env } from "../config/env";
import Utils from "../utils/Utils";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { NextFunction, Request } from "express";
import User from "../models/User";
import { AppError } from "../utils/AppError";

class AuthService {
  static getAcessToken(req: Request) {
    return req.headers.authorization
      ? req.headers.authorization?.split(" ")[1]
      : "";
  }

  static generateVerificationToken(ttl: StringValue) {
    const token = Utils.generateOTP(6);
    const token_ttl = new Date(Date.now() + ms(ttl));
    return { token, token_ttl };
  }

  static hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  static comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }

  static jwtSign(payload: string | object) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_SECRET_TTL as SignOptions["expiresIn"],
    });
  }

  static jwtVerify(token: string, secret: string) {
    return jwt.verify(token, secret) as JwtPayloadBase;
  }

  static jwtPurposeVerify(token: string, purpose: TokenPurpose) {
    const jwt = this.jwtVerify(token, env.JWT_SECRET) as JwtPayloadBase;
    const purposes = jwt.purposes;

    return purposes.includes(purpose) ?? false;
  }

  static async getCurrentUser(req: Request) {
    const userId = req.user?.userId;
    if (!userId) throw new AppError("Unauthorized", 401);

    return this.getUserById(userId);
  }

  static async getUserById(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User does not exist", 404);
    return user;
  }
}

export default AuthService;
