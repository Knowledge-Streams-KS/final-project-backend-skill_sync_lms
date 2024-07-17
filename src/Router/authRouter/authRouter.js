import { Router } from "express";
import userRegisterController from "../../Controller/userRegisterController/userRegisterController.js";
import authenticateMiddleware from "../../Middleware/authMiddleware.js";

const authRouter = Router();
authRouter.post("/signup", userRegisterController.signUp);
authRouter.post("/signin", userRegisterController.signIn);

export default authRouter;
