import ms from "ms";
import { env } from "../config/env";
import ResendMail from "../utils/ResendMail";
import Utils from "../utils/Utils";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

class AuthService {
  static async generateVerificationTokenAndSendEmail(mail: { to: string }) {
    const { verification_token, verification_token_ttl } =
      this.generateVerificationToken();

    const { error } = await ResendMail.sendVerificationToken({
      token: verification_token,
      to: mail.to,
    });

    return { verification_token, verification_token_ttl, error };
  }

  static generateVerificationToken() {
    const verification_token = Utils.generateOTP(6);
    const verification_token_ttl = new Date(
      Date.now() + ms(env.EMAIL_VERIFICATION_TOKEN_TTL),
    );

    return { verification_token, verification_token_ttl };
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
}

export default AuthService;
