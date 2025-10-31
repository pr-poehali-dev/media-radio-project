CREATE TABLE IF NOT EXISTS t_p37980721_media_radio_project.listener_state (
    id INTEGER PRIMARY KEY DEFAULT 1,
    count INTEGER NOT NULL DEFAULT 650,
    last_change BIGINT NOT NULL,
    next_change_delay REAL NOT NULL,
    current_period BIGINT NOT NULL,
    base_time BIGINT NOT NULL,
    CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO t_p37980721_media_radio_project.listener_state (id, count, last_change, next_change_delay, current_period, base_time)
VALUES (1, 650, EXTRACT(EPOCH FROM NOW()), 15.0, FLOOR(EXTRACT(EPOCH FROM NOW()) / 7200), EXTRACT(EPOCH FROM NOW()))
ON CONFLICT (id) DO NOTHING;