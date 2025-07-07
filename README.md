# Tanstack Boilerplate

## Stack

- Tanstack start
- Shadcn UI
- Tailwind CSS
- Lucide Icons
- Better Auth
- Tanstack Query

## How to run

1. Clone the repository
2. Install dependencies
    ```bash
    pnpm install
    ```
3. Copy `.env.example` to `.env` and fill in the values
4. Start Postgres
    ```bash
    docker run \
        -it \
        --rm \
        --name my-new-project-db \
        -p 5433:5432 \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=my-new-project \
        -v /home/paul/ignore_backup/my-new-project-db/data:/var/lib/postgresql/data \
        postgres:latest \
        -c log_statement=all
    ```
5. Apply migrations
    ```bash
    npx drizzle-kit migrate
    ```
6. Start the server
    ```bash
    pnpm dev
    ```

## How to migrate

1. Add a new migration
    ```bash
    npx drizzle-kit generate --name <migration-name>
    ```
2. Run the migration
    ```bash
    npx drizzle-kit migrate
    ```