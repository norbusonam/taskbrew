import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable("task")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo("now()"))
    .addColumn("name", "varchar")
    .addColumn("description", "varchar")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable("task").execute();
}
