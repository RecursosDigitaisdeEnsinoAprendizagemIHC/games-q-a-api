import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { AuthController } from "./controllers/AuthController";
import {
  CreateUserAuthenticatedController,
  // CreateRegularUserController,
} from "./controllers/CreateUserController";
import { ListQuestionsController } from "./controllers/ListQuestionsController";
import { CreateQuestionsController } from "./controllers/CreateQuestionService";
import { GetQuestionAnswerController } from "./controllers/GetQuestionAnswerController";

export const router = Router();

const authController = new AuthController();
const createUserAuthenticatedController =
  new CreateUserAuthenticatedController();
// const createRegularUserController = new CreateRegularUserController();
const listQuestionsController = new ListQuestionsController();
const getQuestionAnswerController = new GetQuestionAnswerController();
const createQuestionsController = new CreateQuestionsController();

router.post("/auth", authController.handle);
router.post(
  "/admin_user",
  ensureAuthenticated,
  createUserAuthenticatedController.handle
);
// router.post("/users", createRegularUserController.handle);
router.get("/questions", listQuestionsController.handle);
router.get("/question/:id", getQuestionAnswerController.handle);
router.post(
  "/questions",
  ensureAuthenticated,
  createQuestionsController.handle
);
