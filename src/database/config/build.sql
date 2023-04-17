BEGIN;

DROP TABLE IF EXISTS users,posts;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email  VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
   title  VARCHAR(255) NOT NULL,
    details TEXT,
    image_url VARCHAR(255),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);
CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    votes INTEGER , 
)
CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    comments TEXT ,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)

)
INSERT INTO users(username,email,password) VALUES('aya','qunooa@gmail.com','123456789')
COMMIT;