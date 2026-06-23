import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

interface ValidateProps {
  schema: ZodTypeAny;
  type: "body" | "query" | "params";
}

class Validate {
  static request({ schema, type }: ValidateProps) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req[type]);
      if (!result.success) {
        const errorPaths = type === "body" ? "form-fields" : type;

        const errors = Object.fromEntries(
          result.error.issues.map((issue) => [
            issue.path.at(-1) ?? errorPaths,
            issue.message,
          ]),
        );

        console.log(result.error.issues);

        return res.status(400).json({ success: false, message: errors });
      }

      next();
    };
  }
}

export default Validate;
