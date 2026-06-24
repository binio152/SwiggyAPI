import ms, { StringValue } from "ms";
import { env } from "../config/env";
import ResendMail from "../utils/ResendMail";
import Utils from "../utils/Utils";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

class AuthService {
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
    return jwt.verify(token, env.JWT_SECRET);
  }
}

export default AuthService;
