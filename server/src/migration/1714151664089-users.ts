// import {MigrationInterface, QueryRunner} from "typeorm";

// export class CreateUserTable1612345678901 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//             CREATE TABLE users (
//                 id UUID PRIMARY KEY,
//                 name VARCHAR(255) NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 address VARCHAR(255) NOT NULL,
//                 payment ENUM('cash', 'credit') NOT NULL,
//                 role VARCHAR(255) DEFAULT 'user',
//                 createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//                 updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//             )
//         `);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`DROP TABLE users`);
//     }

// }
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1714151664089 implements MigrationInterface {
    name = 'CreateUserTable1714151664089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "payment" "users_payment_enum" NOT NULL DEFAULT 'cash', "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_payment_enum" AS ENUM('cash', 'credit')`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CK_b13be831b2e8e132500a0bc2500" CHECK ("payment" = 'cash' OR "payment" = 'credit')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CK_b13be831b2e8e132500a0bc2500"`);
        await queryRunner.query(`DROP TYPE "users_payment_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
