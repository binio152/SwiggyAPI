import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../utils/AppError";
import { env } from "../config/env";
import AuthService from "../services/AuthServices";

interface ValidateProps {
  schema: ZodTypeAny;
  type: "body" | "query" | "params";
}

class Validate {
  static request({ schema, type }: ValidateProps) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req[type]);
      console.log(result); // DEV ONLY
      if (!result.success) {
        const errorPaths = type === "body" ? "form-fields" : type;

        const errors = Object.fromEntries(
          result.error.issues.map((issue) => [
            issue.path.at(-1) ?? errorPaths,
            issue.message,
          ]),
        );

        console.log(result.error.issues); // DEV ONLY

        return res.status(400).json({ success: false, message: errors });
      }

      next();
    };
  }

  static jwt(req: Request, res: Response, next: NextFunction) {
    try {
      const token = AuthService.getAcessToken(req);
      if (!token) return next(new AppError("Unauthorized", 401));

      const payload = AuthService.jwtVerify(
        token,
        env.JWT_SECRET,
      ) as JwtPayloadBase;

      req.user = payload;

      console.log(payload); // DEV ONLY

      next();
    } catch {
      next(new AppError("Invalid Token", 401));
    }
  }

  static banner() {}
}

export default Validate;
