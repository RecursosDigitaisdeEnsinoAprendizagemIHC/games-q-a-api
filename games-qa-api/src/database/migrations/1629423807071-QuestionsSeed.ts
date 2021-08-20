import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { QuestionSeed } from "../seeds/question.seed";

import { Question } from "../../entities/Question";
import { Answer } from "../../entities/Answer";
import { QuestionOption } from "../../entities/QuestionOption";

export class QuestionsSeed1629423807071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let item of QuestionSeed) {
      const { answer, options, ...question } = item;
      const savedQuestion = await getRepository(Question).save(question);
      await getRepository(Answer).save({
        ...answer,
        questionId: savedQuestion.id,
      });
      for (let option of options) {
        await getRepository(QuestionOption).save({
          ...option,
          questionId: savedQuestion.id,
        });
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
