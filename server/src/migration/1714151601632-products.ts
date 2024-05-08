// import {MigrationInterface, QueryRunner} from "typeorm";

// export class CreateProductTable1612345678902 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//             CREATE TABLE products (
//                 id UUID PRIMARY KEY,
//                 name VARCHAR(255) NOT NULL,
//                 brand VARCHAR(255) NOT NULL,
//                 price VARCHAR(255) NOT NULL,
//                 createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//                 updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//             )
//         `);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`DROP TABLE products`);
//     }

// }
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductTable1714151601632 implements MigrationInterface {
    name = 'CreateProductTable1714151601632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "brand" character varying NOT NULL, "price" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
