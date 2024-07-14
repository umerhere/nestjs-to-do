import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration17209608736921720960873965 implements MigrationInterface {
    name = 'Migration17209608736921720960873965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "details" character varying, "status" character varying NOT NULL, "priority" character varying NOT NULL, "due_date" TIMESTAMP NOT NULL, "date_of_creation" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
