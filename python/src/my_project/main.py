from my_project.libs.db_helper import create_session
from my_project.libs.db_models import Post


def main():
    # Add posts
    posts = [
        Post(title="Post 1", content="Content 1"),
        Post(title="Post 2", content="Content 2"),
        Post(title="Post 3", content="Content 3"),
    ]

    with create_session() as session:
        session.add_all(posts)
        session.commit()

    # Get posts
    with create_session() as session:
        posts = session.query(Post).all()
        print(posts)


if __name__ == "__main__":
    main()
