import crypto from "crypto";
import ms, { StringValue } from "ms";

class Utils {
  static getStringTokenTTL(ttl: StringValue) {
    return ms(ms(ttl), { long: true });
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
