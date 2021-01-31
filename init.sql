CREATE TABLE accounts (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
);

INSERT INTO accounts (name)
VALUES ('Scotiabank Debit');
