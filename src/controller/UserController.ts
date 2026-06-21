import { Request, Response } from "express";

class UserController {
  getUserById(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ id, name: "Binida" });
  }
}

export default new UserController();
