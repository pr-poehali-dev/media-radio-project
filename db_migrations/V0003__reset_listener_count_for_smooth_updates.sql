UPDATE t_p37980721_media_radio_project.listener_state 
SET last_change = EXTRACT(EPOCH FROM NOW()) - 5, 
    next_change_delay = 12.0,
    count = 655
WHERE id = 1;