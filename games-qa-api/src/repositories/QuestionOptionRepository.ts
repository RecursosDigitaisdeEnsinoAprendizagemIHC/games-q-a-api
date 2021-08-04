import { EntityRepository, Repository } from "typeorm";
import { QuestionOption } from "../entities/QuestionOption";

@EntityRepository(QuestionOption)
export class QuestionOptionRepository extends Repository<QuestionOption> {}
