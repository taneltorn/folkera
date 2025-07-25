CREATE USER app_user WITH PASSWORD 'app_password';

CREATE SCHEMA IF NOT EXISTS folkera AUTHORIZATION app_user;

GRANT CONNECT ON DATABASE folkera TO app_user;
GRANT USAGE ON SCHEMA folkera TO app_user;
GRANT CREATE ON SCHEMA folkera TO app_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA folkera TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA folkera TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA folkera GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA folkera GRANT USAGE, SELECT ON SEQUENCES TO app_user;

CREATE TABLE IF NOT EXISTS folkera.users (
                                             id SERIAL PRIMARY KEY,
                                             email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             modified_by VARCHAR(255),
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             deleted_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                             );