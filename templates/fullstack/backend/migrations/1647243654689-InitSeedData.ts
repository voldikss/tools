import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitSeedData1647243654689 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // users
    await queryRunner.query(
      `INSERT INTO users (
        id,
        username,
        password
      ) VALUES (
        'builtin',
        'alan',
        '$2b$10$bv.8gv2HZ7gsAzZOF0GFge0VX0dXUk2xeceI7rBLmxQrc4fux6Wua'
      )`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}
