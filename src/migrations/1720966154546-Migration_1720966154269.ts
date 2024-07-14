import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration17209661542691720966154546 implements MigrationInterface {
    name = 'Migration17209661542691720966154546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('Pending', 'Done', 'In Progress', 'Paused')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('Red', 'Yellow', 'Blue')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "title" character varying NOT NULL, "details" character varying, "status" "public"."task_status_enum" NOT NULL DEFAULT 'Pending', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'Blue', "due_date" TIMESTAMP NOT NULL, "date_of_creation" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_45b5a8c7d655acd1ab8bb793146" UNIQUE ("uid"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
