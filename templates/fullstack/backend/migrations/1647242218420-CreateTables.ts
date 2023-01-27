import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTables1647242218420 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // users
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" varchar PRIMARY KEY NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
        "username" varchar NOT NULL,
        "password" varchar NOT NULL,
        "email" varchar
      )`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}
