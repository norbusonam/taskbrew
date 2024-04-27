import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
  MigrationResult,
} from "kysely";
import dotenv from "dotenv";
import { Database } from "@/lib/database";

// check input arguments
if (process.argv.length !== 3) {
  console.error("usage: ts-node scripts/db/migrate.ts <up | down | latest>");
  process.exit(1);
}

// check input argument
if (!["up", "down", "latest"].includes(process.argv[2])) {
  console.error("invalid argument");
  process.exit(1);
}

// load environment variables
dotenv.config({
  path: path.join(__dirname, "..", "..", ".env.local"),
});

// migration function
async function migrate(type: "up" | "down" | "latest") {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  let error: unknown;
  let results: MigrationResult[] | undefined;
  switch (type) {
    case "up":
      ({ error, results } = await migrator.migrateUp());
      break;
    case "down":
      ({ error, results } = await migrator.migrateDown());
      break;
    case "latest":
      ({ error, results } = await migrator.migrateToLatest());
      break;
  }

  results?.forEach((it) => {
    const direction = it.direction === "Up" ? "⬆️" : "⬇️";
    const statusIcon =
      it.status === "Success" ? "✅" : it.status === "Error" ? "❌" : "⚠️";
    console.log(
      `${direction} ${statusIcon} ${it.migrationName} (${it.status})`,
    );
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrate(process.argv[2] as "up" | "down" | "latest");
