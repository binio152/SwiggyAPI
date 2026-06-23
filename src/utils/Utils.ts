import crypto from "crypto";
import bcrypt from "bcrypt";
import { env } from "../config/env";

class Utils {
  static getStringTokenTTL() {
    return (env.EMAIL_VERIFICATION_TOKEN_TTL / 60 / 1000).toString();
  }

  static generateOTP(length: number): string {
    let otp = "";
    const digits = "0123456789";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      otp += digits[array[i] % 10];
    }

    return otp;
  }
}

export default Utils;
