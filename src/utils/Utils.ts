import crypto from "crypto";

class Utils {
  static generateVerificationToken(length: number): string {
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
