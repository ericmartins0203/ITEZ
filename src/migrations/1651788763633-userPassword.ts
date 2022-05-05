import { MigrationInterface, QueryRunner } from "typeorm";

export class userPassword1651788763633 implements MigrationInterface {
    name = 'userPassword1651788763633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "receiveds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "date" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_27d36b18c34287035d6101245ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "balance" double precision NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expends" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "date" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_4e0538f06e53ebcdcdb02cac8bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "receiveds" ADD CONSTRAINT "FK_30d3179f01314b60bc7de7cc8a4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expends" ADD CONSTRAINT "FK_22c07eaadb217bb3d4b41a91fce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expends" DROP CONSTRAINT "FK_22c07eaadb217bb3d4b41a91fce"`);
        await queryRunner.query(`ALTER TABLE "receiveds" DROP CONSTRAINT "FK_30d3179f01314b60bc7de7cc8a4"`);
        await queryRunner.query(`DROP TABLE "expends"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "receiveds"`);
    }

}
