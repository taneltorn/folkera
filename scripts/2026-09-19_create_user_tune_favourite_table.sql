CREATE TABLE IF NOT EXISTS folkera.user_tune_favourite (
    user_id INT NOT NULL,
    tune_id VARCHAR(255) NOT NULL,

    PRIMARY KEY (user_id, tune_id),

    CONSTRAINT fk_user_tune_favourite_user
    FOREIGN KEY (user_id)
    REFERENCES folkera.users(id)
    ON DELETE CASCADE
);