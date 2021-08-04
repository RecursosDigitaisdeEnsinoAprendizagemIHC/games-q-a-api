import { Router } from "express";
import { ListQuestionsController } from "./controllers/ListQuestionsController";
import { CreateQuestionsController } from "./controllers/CreateQuestionService";

export const router = Router();

const listQuestionsController = new ListQuestionsController();
const createQuestionsController = new CreateQuestionsController();

router.get("/questions", listQuestionsController.handle);
router.post("/questions", createQuestionsController.handle);
