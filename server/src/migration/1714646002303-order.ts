// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Order1714646002303 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);

//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }

// }
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrderTable1714646002303 implements MigrationInterface {
    name = 'CreateOrderTable1714646002303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_61f61d94c3faad2b9d44b339ccc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_61f61d94c3faad2b9d44b339ccc"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
