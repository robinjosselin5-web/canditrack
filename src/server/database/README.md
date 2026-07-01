# CandiTrack Database

PostgreSQL is installed and managed manually by the developer.

Prisma is the source of truth for the application schema and runtime migrations.
The SQL files in this folder are kept as bootstrap/reference material only; they are not the execution path used by the backend.

Codex must only provide:

- SQL schema files
- migration files
- `DATABASE_URL` configuration

## Local Setup

Create the database manually:

```sql
CREATE DATABASE canditrack;
```

Then apply migrations in order:

```text
src/server/database/migrations/000_create_users_table.sql
src/server/database/migrations/001_add_password_reset_columns.sql
src/server/database/migrations/002_create_core_domain_tables.sql
```

The complete reference schema is available at:

```text
src/server/database/schema.sql
```

## Prisma

The Prisma schema is available at:

```text
prisma/schema.prisma
```

Validate the Prisma schema:

```bash
npm run prisma:validate
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Create and apply a Prisma migration when the database is available:

```bash
npm run prisma:migrate
```

## Environment

The backend expects:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/canditrack
```
