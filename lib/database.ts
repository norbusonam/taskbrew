import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

// +-----------------+
// | database tables |
// +-----------------+
export interface Database {
  task: TaskTable;
}

// +------------+
// | table base |
// +------------+
interface BaseTable {
  id: Generated<number>;
  created_at: ColumnType<Date, never, never>;
}

// +------------+
// | task table |
// +------------+
export interface TaskTable extends BaseTable {
  name: string;
  description: string;
}

export type Task = Selectable<TaskTable>;
export type NewTask = Insertable<TaskTable>;
export type TaskUpdate = Updateable<TaskTable>;

// +---------------------+
// | database connection |
// +---------------------+
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 10,
    }),
  }),
});
