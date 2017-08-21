\c code_share;

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    time TIME
);