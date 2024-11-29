import { MigrationInterface, QueryRunner } from "typeorm";

export class Changes011732887302076 implements MigrationInterface {
    name = 'Changes011732887302076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "model" character varying NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13f80849df4d5e35775014c4d8" ON "car" ("brand", "model") `);
        await queryRunner.query(`CREATE TABLE "region" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "place" text NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report_car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying, "model" character varying, "report_id" uuid, CONSTRAINT "PK_a00ebbc0063a70385cef813796c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report_region" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "region" character varying NOT NULL, "report_id" uuid, CONSTRAINT "PK_f9a58a3983576e86bda3dc30317" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."report_type_enum" NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report_after_3_changes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "article_id" uuid NOT NULL, "report_id" uuid, CONSTRAINT "REL_bfacb666c2b69d8855a1952b24" UNIQUE ("article_id"), CONSTRAINT "PK_e8819b2b0ebde23c751f93ab344" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "body" text, "sellerType" "public"."articles_sellertype_enum" NOT NULL DEFAULT 'SELLER', "cost" numeric(10) NOT NULL, "status" "public"."articles_status_enum" NOT NULL DEFAULT 'ACTIVE', "user_id" uuid NOT NULL, "car_id" uuid NOT NULL, "region_id" uuid NOT NULL, "changesCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" text NOT NULL, "phoneNumber" text NOT NULL, "isTemporaryPassword" boolean NOT NULL DEFAULT false, "password" text NOT NULL, "isBanned" "public"."users_isbanned_enum" NOT NULL DEFAULT 'NOT_BANNED', "image" text, "deleted" TIMESTAMP, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscribe" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, CONSTRAINT "REL_81a2738021382c267e417571de" UNIQUE ("user_id"), CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price" ("id" SERIAL NOT NULL, "priceUsd" integer NOT NULL, "priceEur" integer NOT NULL, "priceUah" integer NOT NULL, "userPrice" integer NOT NULL, "currency" character varying NOT NULL, "exchangeRateUsd" integer NOT NULL, "exchangeRateEur" integer NOT NULL, "exchangeRateUah" integer NOT NULL, "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_dealer_ship" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" character varying(255) NOT NULL, "address" text NOT NULL, "deleted" TIMESTAMP, CONSTRAINT "UQ_90b04f33cf34c3648e646487680" UNIQUE ("email"), CONSTRAINT "PK_347a82a800763caac8f2f678702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report_car" ADD CONSTRAINT "FK_725a835ea78598b74dfe18be5f4" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report_region" ADD CONSTRAINT "FK_cf886f7f8cc05e8fb3d3b150a15" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report_after_3_changes" ADD CONSTRAINT "FK_bfacb666c2b69d8855a1952b24f" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report_after_3_changes" ADD CONSTRAINT "FK_cc48e1e85fc719967ffe7d85c32" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_9f95d7687a27c2fd577b043034f" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_4cdd2f2c8e75960a16dbeceb446" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "FK_81a2738021382c267e417571dec" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "FK_81a2738021382c267e417571dec"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_4cdd2f2c8e75960a16dbeceb446"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_9f95d7687a27c2fd577b043034f"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
        await queryRunner.query(`ALTER TABLE "report_after_3_changes" DROP CONSTRAINT "FK_cc48e1e85fc719967ffe7d85c32"`);
        await queryRunner.query(`ALTER TABLE "report_after_3_changes" DROP CONSTRAINT "FK_bfacb666c2b69d8855a1952b24f"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`);
        await queryRunner.query(`ALTER TABLE "report_region" DROP CONSTRAINT "FK_cf886f7f8cc05e8fb3d3b150a15"`);
        await queryRunner.query(`ALTER TABLE "report_car" DROP CONSTRAINT "FK_725a835ea78598b74dfe18be5f4"`);
        await queryRunner.query(`DROP TABLE "car_dealer_ship"`);
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP TABLE "subscribe"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "report_after_3_changes"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "report_region"`);
        await queryRunner.query(`DROP TABLE "report_car"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13f80849df4d5e35775014c4d8"`);
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
