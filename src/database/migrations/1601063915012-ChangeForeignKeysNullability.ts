import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeForeignKeysNullability1601063915012
  implements MigrationInterface {
  name = 'ChangeForeignKeysNullability1601063915012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "organizer_id" DROP NOT NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "user_event_like" DROP CONSTRAINT "FK_db4f2eee9a9b978e25cf4ae78e6"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_event_like" ADD CONSTRAINT "FK_db4f2eee9a9b978e25cf4ae78e6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );

    await queryRunner.query(
      `ALTER TABLE "user_event_like" DROP CONSTRAINT "FK_afc685a685cf5615c8dddc9b21f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_event_like" ADD CONSTRAINT "FK_afc685a685cf5615c8dddc9b21f" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "organizer_id" SET NOT NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "user_event_like" DROP CONSTRAINT "FK_db4f2eee9a9b978e25cf4ae78e6"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_event_like" ADD CONSTRAINT "FK_db4f2eee9a9b978e25cf4ae78e6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );

    await queryRunner.query(
      `ALTER TABLE "user_event_like" DROP CONSTRAINT "FK_afc685a685cf5615c8dddc9b21f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_event_like" ADD CONSTRAINT "FK_afc685a685cf5615c8dddc9b21f" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
  }
}
