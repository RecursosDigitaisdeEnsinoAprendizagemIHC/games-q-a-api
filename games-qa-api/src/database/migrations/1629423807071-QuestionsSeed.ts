import {
  getRepository,
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from "typeorm";
import { QuestionSeed } from "../seeds/question.seed";

import { Question } from "../../entities/Question";
import { Answer } from "../../entities/Answer";
import { QuestionOption } from "../../entities/QuestionOption";

export class QuestionsSeed1629423807071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "questions",
      new TableColumn({
        name: "description",
        type: "text",
        default: null,
        charset: "utf8mb4",
      })
    );

    await queryRunner.changeColumn(
      "questions",
      "title",
      new TableColumn({
        name: "title",
        type: "text",
        charset: "utf8mb4",
      })
    );

    await queryRunner.changeColumn(
      "answers",
      "reason",
      new TableColumn({
        name: "reason",
        type: "text",
        charset: "utf8mb4",
      })
    );

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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository(Answer).delete({});
    await getRepository(QuestionOption).delete({});
    await getRepository(Question).delete({});
    await queryRunner.dropColumn("questions", "description");
    await queryRunner.changeColumn(
      "questions",
      "title",
      new TableColumn({
        name: "title",
        type: "varchar",
      })
    );
    await queryRunner.changeColumn(
      "answers",
      "reason",
      new TableColumn({
        name: "reason",
        type: "varchar",
      })
    );
  }
}
