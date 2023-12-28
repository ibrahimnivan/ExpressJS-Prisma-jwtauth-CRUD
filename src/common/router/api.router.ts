import { Router } from "express";
import authRouter from "../../modules/auth/router/auth.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
