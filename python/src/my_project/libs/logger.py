import os
import sys

from loguru import logger

# Remove the default handler to avoid duplicate logs
logger.remove()

# Add a new handler with colorized output and level-specific colors
# Colors: DEBUG=blue, INFO=cyan, SUCCESS=green, WARNING=yellow, ERROR=red, CRITICAL=red+bold
logger.add(
    sys.stderr,
    level=os.environ.get("LOG_LEVEL", "INFO"),
    colorize=True,
    format="<level>{time:YYYY-MM-DD HH:mm:ss}</level> | <level>{level: <8}</level> | <level>{name}:{function}:{line}</level> - <level>{message}</level>",
)
