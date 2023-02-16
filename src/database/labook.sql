-- Active: 1676291155560@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    creator_id TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) references users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) references posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Natalia", "nataliao@email.com", "123456", "NORMAL"),
	("u002", "Stela", "stela@email.com", "789789", "NORMAL"),
    ("u003", "Nice", "nice@email.com", "010101", "ADMIN");

INSERT INTO posts (id, creator_id, content)
VALUES
	("p001", "u001", "Olá mundo!"),
    ("p002", "u001", "Doguinhos lindos"),
	("p003", "u002", "Gatitos fofos");

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
	("u002", "p001", 1),
	("u003", "p001", 1),
    ("u002", "p002", 1),
	("u003", "p002", 1),
    ("u001", "p003", 1),
    ("u003", "p003", 0);

UPDATE posts
SET likes = 2
WHERE id = "p001";

UPDATE posts
SET likes = 2
WHERE id = "p002";

UPDATE posts
SET likes = 1
WHERE id = "p003";

UPDATE posts
SET dislikes = 1
WHERE id = "p003";


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE posts;

DROP TABLE users;

DROP TABLE likes_dislikes;