import { Request, Response, NextFunction } from "express";
const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization && authorization === "Bearer 1234") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
export { authMiddleWare };
