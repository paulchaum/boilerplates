from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from my_project.libs.config import DB_URI

# Add create_engine kwargs based on DB_URI
create_engine_kwargs = {}
if DB_URI and DB_URI.startswith("postgres"):
    create_engine_kwargs["client_encoding"] = "utf8"
    create_engine_kwargs["pool_size"] = 50

create_session = sessionmaker(bind=create_engine(DB_URI, **create_engine_kwargs))
