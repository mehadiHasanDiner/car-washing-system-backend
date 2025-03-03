import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Id is required." }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const signUpValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Id is required." }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const AuthValidation = { loginValidationSchema, signUpValidationSchema };
