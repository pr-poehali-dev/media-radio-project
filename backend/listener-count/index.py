import json
import os
import time
import random
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Returns synchronized listener count that changes smoothly between 613-702
    Args: event - dict with httpMethod
          context - object with request_id attribute
    Returns: HTTP response with current listener count
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration missing'})
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    current_time = int(time.time() * 1000)
    
    cursor.execute("SELECT * FROM t_p37980721_media_radio_project.listener_state WHERE id = 1")
    state = cursor.fetchone()
    
    if not state:
        initial_count = random.randint(613, 702)
        cursor.execute(
            "INSERT INTO t_p37980721_media_radio_project.listener_state (id, count, last_change, next_change_delay, current_period, base_time) VALUES (1, %s, %s, %s, %s, %s)",
            (initial_count, current_time, 8000, current_time, current_time)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'count': initial_count})
        }
    
    count = state['count']
    last_change = state['last_change']
    next_change_delay = state['next_change_delay']
    current_period = state['current_period']
    base_time = state['base_time']
    
    if current_time - current_period >= 60000:
        current_period = current_time
        base_time = current_time
        cursor.execute(
            "UPDATE t_p37980721_media_radio_project.listener_state SET current_period = %s, base_time = %s WHERE id = 1",
            (current_period, base_time)
        )
        conn.commit()
    
    if current_time - last_change >= next_change_delay:
        change = random.choice([-6, -5, 5, 6])
        new_count = max(613, min(702, count + change))
        new_delay = random.randint(8000, 15000)
        
        cursor.execute(
            "UPDATE t_p37980721_media_radio_project.listener_state SET count = %s, last_change = %s, next_change_delay = %s WHERE id = 1",
            (new_count, current_time, new_delay)
        )
        conn.commit()
        count = new_count
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'count': count})
    }
