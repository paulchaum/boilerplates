import datetime
import uuid
from dataclasses import dataclass, field

from sqlalchemy import (
    Column,
    DateTime,
    String,
    Uuid,
    func,
)
from sqlalchemy.orm import declarative_mixin, registry

mapper_registry = registry()
Base = mapper_registry.generate_base()


@declarative_mixin
@dataclass
class IdBaseMixin:
    __sa_dataclass_metadata_key__ = "sa"

    id: int = field(
        init=False,
        metadata={
            "sa": Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
        },
    )


@declarative_mixin
@dataclass
class TimestampBaseMixin:
    __sa_dataclass_metadata_key__ = "sa"

    created_at: datetime.datetime = field(
        init=False,
        metadata={
            "sa": Column(
                DateTime,
                default=datetime.datetime.now(datetime.UTC),
                nullable=False,
                server_default=func.now(),
            )
        },
    )
    last_update: datetime.datetime = field(
        init=False,
        metadata={
            "sa": Column(
                DateTime,
                default=datetime.datetime.now(datetime.UTC),
                onupdate=datetime.datetime.now(datetime.UTC),
                nullable=False,
                server_default=func.now(),
            )
        },
    )


@mapper_registry.mapped
@dataclass
class Post(IdBaseMixin, TimestampBaseMixin):
    __tablename__ = "post"
    __sa_dataclass_metadata_key__ = "sa"

    title: str = field(metadata={"sa": Column(String, nullable=False)})
    content: str = field(metadata={"sa": Column(String, nullable=False)})
