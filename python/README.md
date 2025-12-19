# Python Boilerplate

## Stack

- Python 3.13
- SQLAlchemy
- Alembic
- uv
- pre-commit
- ruff
- ty

## Development

### Installation

1. Clone the repository
    ```bash
    npx gitpick https://github.com/paulchaum/boilerplates/tree/main/python my-awesome-project
    ```
2. Rename the project:
    ```bash
    ./init.sh my-awesome-project
    ```
3. Install the dependencies:
    ```bash
    uv sync
    source .venv/bin/activate
    ```
4. Create a `.env` file from the `.env.example` file:
    ```bash
    cp .env.example .env
    ```
5. Initialize the repository:
    ```bash
    git init
    ```
6. Install the pre-commit hooks:
    ```bash
    pre-commit install
    ```
7. Lint the code:
    ```bash
    ruff check --fix && ruff format
    ```
8. Type check the code:
    ```bash
    ty check
    ```
9. Migrate the database:
    ```bash
    alembic upgrade head
    ```
10. Run the project:
    ```bash
    uv run my-awesome-project
    ```
    or
    ```bash
    uv run python src/my_awesome_project/main.py
    ```