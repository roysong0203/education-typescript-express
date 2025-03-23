import express, { Request, Response } from "express";

const app = express();
const PORT = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.get("/cat", (req: Request, res: Response) => {
  res.send("GET, It's a cute cat!");
});

app.post("/cat", (req: Request, res: Response) => {
  res.send("POST, It's a cute cat!");
});

app.put("/cat", (req: Request, res: Response) => {
  res.send("PUT, It's a cute cat!");
});

app.delete("/cat", (req: Request, res: Response) => {
  res.send("DELETE, It's a cute cat!");
});

app.get("/cat/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { size } = req.query;
  res.send(`GET, It's a cute cat! ID: ${id}, Size: ${size}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
