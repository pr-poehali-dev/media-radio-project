UPDATE t_p37980721_media_radio_project.listener_state 
SET last_change = EXTRACT(EPOCH FROM NOW()) - 20, 
    next_change_delay = 15.0 
WHERE id = 1;