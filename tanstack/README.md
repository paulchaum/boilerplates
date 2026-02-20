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

## Development

### Start Development Server

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
    docker compose -f compose.dev.yaml up --build
    ```
7. Open the app at `http://localhost:3000`

To stop the stack:
```bash
docker compose -f compose.dev.yaml down
```

### How to migrate

1. Add a new migration
    ```bash
    pnpm docker:db:generate --name <migration-name>
    ```
2. Run the migration
    ```bash
    pnpm docker:db:migrate
    ```

### Install a new dependency

1. Use `pnpm` to install a new dependency. Example:
    ```bash
    pnpm add <package-name>
    ```
2. Then restart the server to see the changes:
    ```bash
    docker compose -f compose.dev.yaml restart app
    ```

## Production

### Start Production Server

Start the production server:
```bash
docker compose up
```