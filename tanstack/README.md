# Tanstack Boilerplate

## Stack

- Tanstack start
- Shadcn UI
- Tailwind CSS
- Lucide Icons
- Better Auth
- Tanstack Query
- BiomeJS
- Lefthook
- React i18next

## How to run with Docker Compose (Recommended)

1. Clone the repository
    ```bash
    npx gitpick https://github.com/paulchaum/boilerplates/tree/main/tanstack my-app
    ```
2. Init git repository
    ```bash
    git init
    ```
3. Install dependencies:
    ```bash
    pnpm install
    ```
4. Set up git hooks with lefthook
    ```bash
    pnpm lefthook install
    ```
5. Copy `.env.example` to `.env` and fill in the values
    ```bash
    cp .env.example .env
    ```
6. Start the development server
    ```bash
    docker compose -f compose.dev.yaml up --build --watch
    ```
7. Open the app at `http://localhost:3000`

To stop the stack:
```bash
docker compose -f compose.dev.yaml down
```

## How to run without Docker Compose

1. Clone the repository
    ```bash
    npx gitpick https://github.com/paulchaum/boilerplates/tree/main/tanstack my-app
    ```
2. Init git repository
    ```bash
    git init
    ```
3. Install dependencies
    ```bash
    pnpm install
    ```
4. Set up git hooks with lefthook
    ```bash
    pnpm lefthook install
    ```
5. Copy `.env.example` to `.env` and fill in the values
6. Start Postgres
    ```bash
    docker run \
        -it \
        --rm \
        --name my-new-project-db \
        -p 5433:5432 \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=my-new-project \
        -v /path/to/db/data:/var/lib/postgresql/data \
        postgres:latest \
        -c log_statement=all
    ```
    `/path/to/db/data` is the path to the directory where the database data will be stored.
    It must be outside of the project directory.
7. Apply migrations
    ```bash
    npx drizzle-kit migrate
    ```
8. Start the server
    ```bash
    pnpm dev
    ```
9. Lint the code
    ```bash
    pnpm check
    ```

## How to migrate

### With Docker Compose

1. Add a new migration
    ```bash
    pnpm docker:db:generate --name <migration-name>
    ```
2. Run the migration
    ```bash
    pnpm docker:db:migrate
    ```

### Without Docker Compose

1. Add a new migration
    ```bash
    npx drizzle-kit generate --name <migration-name>
    ```
2. Run the migration
    ```bash
    npx drizzle-kit migrate
    ```

## Install a new dependency

Use `pnpm` to install a new dependency. Example:
```bash
pnpm add <package-name>
```

If you are running the development server with Docker Compose, you need to restart the server to see the changes:
```bash
docker compose -f compose.dev.yaml restart app
```