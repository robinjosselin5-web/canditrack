ALTER TABLE users
ADD COLUMN IF NOT EXISTS password_reset_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS password_reset_expires_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS users_password_reset_token_idx
ON users(password_reset_token);
