BEGIN;

ALTER TABLE folkera.users
    ADD COLUMN IF NOT EXISTS username VARCHAR(255);

ALTER TABLE folkera.users
    ALTER COLUMN email DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS users_username_uq
    ON folkera.users (username);

COMMIT;
