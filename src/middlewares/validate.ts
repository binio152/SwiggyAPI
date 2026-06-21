import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = Object.fromEntries(
        result.error.issues.map((issue) => [issue.path.at(-1), issue.message]),
      );

      console.log(result.error.issues);

      return res.status(400).json({ success: false, message: errors });
    }

    next();
  };
