import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routers";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// test route
const test = (req: Request, res: Response, next: NextFunction) => {
  res.send('"Hello world", welcome to car washing system');
};

app.get("/", test);

// application route
app.use("/api/", router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;

// shades-of-purple-hyper
// video 12-3
