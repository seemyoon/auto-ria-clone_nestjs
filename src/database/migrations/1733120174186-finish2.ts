import { MigrationInterface, QueryRunner } from "typeorm";

export class Finish21733120174186 implements MigrationInterface {
    name = 'Finish21733120174186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "sellerType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "sellerType" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "sellerType" SET DEFAULT 'SELLER'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "sellerType" SET NOT NULL`);
    }

}
