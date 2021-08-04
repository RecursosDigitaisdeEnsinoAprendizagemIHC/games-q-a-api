import { Router } from "express";
import { ListQuestionsController } from "./controllers/ListQuestionsController";

export const router = Router();

const listQuestionsController = new ListQuestionsController();

router.get("/questions", listQuestionsController.handle);
