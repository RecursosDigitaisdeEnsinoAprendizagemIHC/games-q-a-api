import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuestionRelatedTables1627047318776
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "questions",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "theme",
            type: "varchar",
          },
          {
            name: "subtheme",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "question_options",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "question_id",
            type: "int",
          },
          {
            name: "option",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKQuestionQuestionOptions",
            referencedTableName: "questions",
            referencedColumnNames: ["id"],
            columnNames: ["question_id"],
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "answers",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "question_id",
            type: "int",
          },
          {
            name: "option",
            type: "varchar",
          },
          {
            name: "reason",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKQuestionAnswer",
            referencedTableName: "questions",
            referencedColumnNames: ["id"],
            columnNames: ["question_id"],
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "tips",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "question_id",
            type: "int",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKQuestionTips",
            referencedTableName: "questions",
            referencedColumnNames: ["id"],
            columnNames: ["question_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tips");
    await queryRunner.dropTable("answers");
    await queryRunner.dropTable("questions");
    await queryRunner.dropTable("questions");
  }
}
