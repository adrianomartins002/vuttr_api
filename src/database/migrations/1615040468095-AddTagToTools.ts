import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagToTools1615040468095 implements MigrationInterface {



  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "tools_tags_tags" ("id" SERIAL NOT NULL, "toolsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_5131c830636d855568d3a70c352" PRIMARY KEY ("toolsId", "tagsId"))`);
    await queryRunner.query(`ALTER TABLE "tools_tags_tags" ADD CONSTRAINT "FK_4347fec6e6cc3be4ce39d9d9f36" FOREIGN KEY ("toolsId") REFERENCES "tools"("id") ON DELETE CASCADE`);
    await queryRunner.query(`ALTER TABLE "tools_tags_tags" ADD CONSTRAINT "FK_80456ff2d7fd676c1ac2d107f31" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "tools_tags_tags" DROP CONSTRAINT "FK_80456ff2d7fd676c1ac2d107f31"`);
    await queryRunner.query(`ALTER TABLE "tools_tags_tags" DROP CONSTRAINT "FK_4347fec6e6cc3be4ce39d9d9f36"`);
    await queryRunner.query(`DROP TABLE "tools_tags_tags"`);
  }

}
