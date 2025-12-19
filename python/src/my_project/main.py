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
        posts = session.query(Post).all()
        for post in posts:
            print(f"- \033[1;4mID\033[0m: {post.id}")
            print(f"  \033[1;4mTitle\033[0m: {post.title}")
            print(f"  \033[1;4mContent\033[0m: {post.content}")
            print(f"  \033[1;4mCreated At\033[0m: {post.created_at}")
            print(f"  \033[1;4mLast Update\033[0m: {post.last_update}")
            print()
        session.rollback()


if __name__ == "__main__":
    main()
