import { Request, Response } from "express";

const createUser = (req: Request, res: Response) => {
    const user = req.body;
    
  res.send("Hello World!");
};
