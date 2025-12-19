from my_project.libs.db_helper import create_session
from my_project.libs.db_models import Post
from my_project.libs.logger import logger


def main():
    # Add posts
    posts = [
        Post(title="Post 1", content="Content 1"),
        Post(title="Post 2", content="Content 2"),
        Post(title="Post 3", content="Content 3"),
    ]

    with create_session() as session:
        session.add_all(posts)
        posts = session.query(Post).all()
        for post in posts:
            logger.info(f"ID: {post.id}")
            logger.info(f"Title: {post.title}")
            logger.info(f"Content: {post.content}")
            logger.info(f"Created At: {post.created_at}")
            logger.info(f"Last Update: {post.last_update}")
            logger.info("-" * 50)
        session.rollback()


if __name__ == "__main__":
    main()
