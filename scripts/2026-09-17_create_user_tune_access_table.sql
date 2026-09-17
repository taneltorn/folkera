CREATE TABLE IF NOT EXISTS folkera.user_tune_access (
    user_id INT NOT NULL,
    access_ref VARCHAR(255) NOT NULL,

    PRIMARY KEY (user_id, access_ref),

    CONSTRAINT fk_user_tune_access_user
    FOREIGN KEY (user_id)
    REFERENCES folkera.users(id)
    ON DELETE CASCADE
);