-- Create an admin user for in-app user management (change the password hash)
INSERT INTO folkera.users (email, password, name, role, created_by, created_at, modified_by,
                           modified_at, deleted_by, deleted_at)
VALUES ('tanel.torn@gmail.com',
        '$2b$10$s4cMmNLG95a5e79Jff4yi.50RYJ44Oo9JhpJrWsgadmKEw8AEZV5S',
        'Tanel Torn',
        'ADMIN',
        'System',
        CURRENT_TIMESTAMP,
        NULL,
        CURRENT_TIMESTAMP,
        NULL,
        NULL);