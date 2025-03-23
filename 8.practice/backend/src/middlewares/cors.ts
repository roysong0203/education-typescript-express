import { Request, Response, NextFunction } from "express";

const allowCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Access-Control-Expose-Headers",
    "X-Powered-By, Etag, Connection, Content-Length, Content-Type, Date, Keep-Alive"
  );
  next();
};

export { allowCorsHeaders };
