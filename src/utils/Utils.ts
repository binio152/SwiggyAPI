import crypto from "crypto";
import ms, { StringValue } from "ms";
import slugify from "slugify";

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

  static createSlug(name: string) {
    return slugify(name, {
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });
  }
}

export default Utils;
