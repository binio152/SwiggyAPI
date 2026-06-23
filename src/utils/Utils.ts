import crypto from "crypto";
import { env } from "../config/env";
import ms from "ms";

class Utils {
  static getStringTokenTTL() {
    return ms(ms(env.EMAIL_VERIFICATION_TOKEN_TTL), { long: true });
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
