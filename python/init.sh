#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: ./init.sh <new-project-name>"
    echo "Example: ./init.sh my-awesome-app"
    exit 1
fi

NEW_NAME="$1"
PACKAGE_NAME=$(echo "$NEW_NAME" | tr '-' '_' | tr '[:upper:]' '[:lower:]')

echo "🔄 Renaming project to: $NEW_NAME"
echo "📦 Package name will be: $PACKAGE_NAME"

# Rename directory
mv src/my_project "src/$PACKAGE_NAME"

# Update pyproject.toml
sed -i.bak "s/my-project/$NEW_NAME/g" pyproject.toml
sed -i.bak "s/my_project/$PACKAGE_NAME/g" pyproject.toml
rm pyproject.toml.bak

# Update README
sed -i.bak "s/my-project/$NEW_NAME/g" README.md
sed -i.bak "s/my_project/$PACKAGE_NAME/g" README.md
rm README.md.bak

# Update alembic/env.py
sed -i.bak "s/my_project/$PACKAGE_NAME/g" alembic/env.py
rm alembic/env.py.bak

# Update Python files
find "src/$PACKAGE_NAME" -name "*.py" -exec sed -i.bak "s/my_project/$PACKAGE_NAME/g" {} \;
find "src/$PACKAGE_NAME" -name "*.bak" -delete

echo "✅ Done! Your project '$NEW_NAME' is ready."
echo ""
rm -- "$0"