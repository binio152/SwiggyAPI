import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadBase | JwtPayload;
      restaurant?: {
        id: string;
      };
      headers?: {
        authorization?: string;
      };
    }
  }
}

export {};
