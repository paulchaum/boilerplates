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
    ```bash
    npx gitpick https://github.com/paulchaum/boilerplates/tree/main/tanstack my-app
    ```
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
        -v /path/to/db/data:/var/lib/postgresql/data \
        postgres:latest \
        -c log_statement=all
    ```
    `/path/to/db/data` is the path to the directory where the database data will be stored.
    It must be outside of the project directory.
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