"""
Business: Provides synchronized listener count for all users
Args: event with httpMethod; context with request_id
Returns: Current listener count for the radio station
"""

import json
import time
import random
import math
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def get_period_seed():
    current_period = int(time.time() // 7200)
    return current_period

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
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
    
    if method == 'GET':
        current_time = time.time()
        current_period = get_period_seed()
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT * FROM t_p37980721_media_radio_project.listener_state WHERE id = 1")
        state = cursor.fetchone()
        
        count = state['count']
        last_change = state['last_change']
        next_change_delay = state['next_change_delay']
        stored_period = state['current_period']
        base_time = state['base_time']
        
        if current_period != stored_period:
            random.seed(current_period)
            count = random.randint(613, 702)
            random.seed()
            base_time = current_time
            last_change = current_time
            next_change_delay = random.uniform(8, 25)
            
            cursor.execute(
                "UPDATE t_p37980721_media_radio_project.listener_state SET count = %s, last_change = %s, next_change_delay = %s, current_period = %s, base_time = %s WHERE id = 1",
                (count, last_change, next_change_delay, current_period, base_time)
            )
            conn.commit()
        else:
            time_since_last_change = current_time - last_change
            
            if time_since_last_change >= next_change_delay:
                change_direction = 1 if random.random() > 0.5 else -1
                change_amount = random.randint(1, 4)
                
                count = count + (change_direction * change_amount)
                count = max(613, min(702, count))
                
                last_change = current_time
                next_change_delay = random.uniform(8, 25)
                
                cursor.execute(
                    "UPDATE t_p37980721_media_radio_project.listener_state SET count = %s, last_change = %s, next_change_delay = %s WHERE id = 1",
                    (count, last_change, next_change_delay)
                )
                conn.commit()
        
        time_offset = (current_time - base_time) / 300
        natural_variation = math.sin(time_offset) * 2
        display_count = int(count + natural_variation)
        display_count = max(613, min(702, display_count))
        
        time_since_last_change = current_time - last_change
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'count': display_count,
                'timestamp': current_time,
                'next_change_in': max(0, next_change_delay - time_since_last_change)
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }