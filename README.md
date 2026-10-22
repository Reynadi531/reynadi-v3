# reynadi.id

The source for Reynadi Andreas Priesley's personal portfolio. It introduces his work as a software engineer, showcases product concepts and experience, explains his approach to building software, and collects short writing previews about engineering, automation, and cloud infrastructure.

The site has four pages:

- **Home (`/`)** — introduction, experience, selected work, writing previews, and contact.
- **Work (`/work`)** — experience and three product concepts: Orbit, Fieldnote, and Relay.
- **About (`/about`)** — Reynadi's story and approach to product engineering, automation, and infrastructure.
- **Writing (`/writing`)** — article previews and topics. Full article pages are not implemented yet.

## Stack

This is a Bun and Turborepo monorepo. The web app uses React 19, TanStack Start and Router, Vite, Tailwind CSS, and shared shadcn-style UI components. The server uses Nitro and evlog. A PostgreSQL and Drizzle package is included for database access; the current portfolio content is defined in code.

## Run locally

You'll need Bun 1.4.3 and PostgreSQL. Docker Compose can start the included development database.

```bash
bun install
bun run db:start
```

Create `apps/web/.env` with a connection string for your PostgreSQL instance. For the included Docker Compose database:

```dotenv
DATABASE_URL=postgresql://postgres:password@localhost:5432/reynad-v3
```

Then start the site:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001). If you already have PostgreSQL, use your own connection string and skip `bun run db:start`.

The environment schema is in `apps/web/.env.schema`. `bun install` generates its typed environment accessor; run `bun run env:generate` after editing an environment schema.

## Repository layout

| Path              | Purpose                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| `apps/web`        | Portfolio routes, content, components, assets, and server setup        |
| `packages/ui`     | Shared UI components and global styles                                 |
| `packages/db`     | PostgreSQL connection, Drizzle setup, and local database configuration |
| `packages/config` | Shared TypeScript configuration                                        |

Portfolio copy, projects, experience, and writing previews live in `apps/web/src/lib/site.ts`. Page routes live in `apps/web/src/routes`, and images are in `apps/web/public/images`.

## Useful commands

| Command                                | Purpose                                      |
| -------------------------------------- | -------------------------------------------- |
| `bun run dev`                          | Start the web app in development mode        |
| `bun run build`                        | Build the workspace                          |
| `bun run check-types`                  | Check TypeScript across packages             |
| `bun run db:start` / `bun run db:stop` | Start or stop the local PostgreSQL container |
| `bun run db:push`                      | Apply the Drizzle schema to the database     |
| `bun run db:studio`                    | Open Drizzle Studio                          |
| `bun run check`                        | Run Oxlint and format files with Oxfmt       |

The app has a Vercel Services configuration in `vercel.json`. Root scripts provide Vercel linking, environment sync, preview deployment, and production deployment commands.

## Content notes

The contact email and résumé URL in `apps/web/src/lib/site.ts` are placeholders marked for replacement. The résumé download points to `/resume.pdf`, which is not currently in `apps/web/public`.
