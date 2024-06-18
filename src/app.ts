import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
// app.use("/api/", )

// test route
const test = (req: Request, res: Response) => {
  res.send('"Hello world", welcome to car washing system');
};

app.get("/", test);

export default app;
