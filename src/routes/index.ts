import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const router = express.Router();

router
  .get("/healthCheck", (_, res) => res.sendStatus(200))
  .use("/auth", authRouter)
  .use("/user", userRouter);

export default router;
