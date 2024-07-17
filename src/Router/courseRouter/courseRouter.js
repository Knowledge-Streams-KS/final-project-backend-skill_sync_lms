import { Router } from "express";
import courseController from "../../Controller/courseController/courseController.js";
// import authenticateMiddleware from "../../Middleware/authMiddleware.js";

const courseRouter = Router();
courseRouter.get("/courses", courseController.getAllCourse);
courseRouter.get("/course:id", courseController.getSingleCourse);
courseRouter.post("/course", courseController.createCourse);

export default courseRouter;
