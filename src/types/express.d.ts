import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadBase | JwtPayload;
      headers?: {
        authorization?: string;
      };
    }
  }
}

export {};
