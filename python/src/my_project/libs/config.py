import os

from dotenv import load_dotenv

load_dotenv()

DB_URI = os.environ.get("DB_URI")
