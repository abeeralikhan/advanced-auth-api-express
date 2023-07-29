import express from "express";
import validateResource from "../middlewares/validateResource";
import createUserSchema from "../schemas/user.schema";
import { createUserHandler } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/", validateResource(createUserSchema), createUserHandler);

export default userRouter;
