import express, { Request, Response } from "express";
import { allowCorsHeaders } from "../middlewares/cors";
const catRouter = express.Router();

catRouter.use(allowCorsHeaders);

catRouter.get("/", (req: Request, res: Response) => {
  res.send("GET, It's a cute cat!");
});

catRouter.post("/", (req: Request, res: Response) => {
  res.send("POST, It's a cute cat!");
});

catRouter.put("/", (req: Request, res: Response) => {
  res.send("PUT, It's a cute cat!");
});

catRouter.delete("/", (req: Request, res: Response) => {
  res.send("DELETE, It's a cute cat!");
});

catRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { size } = req.query;
  res.send(`GET, It's a cute cat! ID: ${id}, Size: ${size}`);
});

export default catRouter;
