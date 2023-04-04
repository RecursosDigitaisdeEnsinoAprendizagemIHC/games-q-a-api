import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { TipsSeed } from "../seeds/tip.seed";

export class TipsSeed1680553397465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository("tips").save(TipsSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}