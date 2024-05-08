import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrderProductTable1714646010372 implements MigrationInterface {
    name = 'CreateOrderProductTable1714646010372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "order_id" integer, "product_id" uuid, CONSTRAINT "PK_83c3ae71413ba2e84ddaf63ce48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_b8b51b1265775a5b45d7461ee90" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_0fa46a776dc48652a19273236c1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_0fa46a776dc48652a19273236c1"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_b8b51b1265775a5b45d7461ee90"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
    }

}
