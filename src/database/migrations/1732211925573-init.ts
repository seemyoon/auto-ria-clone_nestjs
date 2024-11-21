import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732211925573 implements MigrationInterface {
    name = 'Init1732211925573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BUYER', 'SELLER', 'MANAGER', 'ADMIN', 'DEALERSHIP_ADMIN', 'DEALERSHIP_MANAGER', 'DEALERSHIP_SELLER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "image" text, "deleted" TIMESTAMP, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscribe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subscriptionTime" text NOT NULL, CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "model" character varying NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13f80849df4d5e35775014c4d8" ON "car" ("brand", "model") `);
        await queryRunner.query(`CREATE TABLE "car_dealer_ship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" character varying(255) NOT NULL, "address" text NOT NULL, "deleted" TIMESTAMP, CONSTRAINT "UQ_90b04f33cf34c3648e646487680" UNIQUE ("email"), CONSTRAINT "PK_347a82a800763caac8f2f678702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cost" numeric NOT NULL, "region" text NOT NULL, CONSTRAINT "PK_323734ef563e81a8cbbf1b35de9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6811a64640f8b1951631ed4d54" ON "car_price" ("cost") `);
        await queryRunner.query(`CREATE TYPE "public"."car_articles_sellertype_enum" AS ENUM('SELLER', 'DEALER_SHIP_SELLER')`);
        await queryRunner.query(`CREATE TABLE "car_articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "body" text, "sellerType" "public"."car_articles_sellertype_enum" NOT NULL, "numberOfViews" integer, CONSTRAINT "PK_5e31051c4e44f263875feb5c58c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`DROP TABLE "car_articles"`);
        await queryRunner.query(`DROP TYPE "public"."car_articles_sellertype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6811a64640f8b1951631ed4d54"`);
        await queryRunner.query(`DROP TABLE "car_price"`);
        await queryRunner.query(`DROP TABLE "car_dealer_ship"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13f80849df4d5e35775014c4d8"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "subscribe"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
