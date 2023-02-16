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
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Natalia", "nataliao@email.com", "123456", "NORMAL"),
	("u002", "Stela", "stela@email.com", "789789", "NORMAL"),
    ("u003", "Nice", "nice@email.com", "010101", "ADMIN");

INSERT INTO posts (id, creator_id, content)
VALUES
	("p001", "u001", "Olá mundo!"),
	("p002", "u002", "Gatitos fofos");

SELECT * FROM users;

SELECT * FROM posts;

DROP TABLE posts;

DROP TABLE users;