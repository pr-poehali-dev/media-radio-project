"""
Business: Provides synchronized listener count for all users
Args: event with httpMethod; context with request_id
Returns: Current listener count for the radio station
"""

import json
import time
import random
import math
from typing import Dict, Any

# Global state to track listener count and last update
_state = {
    'count': 650,
    'base_time': time.time(),
    'last_change': time.time(),
    'next_change_delay': random.uniform(8, 25)
}

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
        
        # Check if it's time for the next change
        time_since_last_change = current_time - _state['last_change']
        
        if time_since_last_change >= _state['next_change_delay']:
            # Determine change direction and amount
            change_direction = 1 if random.random() > 0.5 else -1
            change_amount = random.randint(1, 4)
            
            # Apply change
            new_count = _state['count'] + (change_direction * change_amount)
            _state['count'] = max(613, min(702, new_count))
            
            # Schedule next change with random delay (8-25 seconds)
            _state['last_change'] = current_time
            _state['next_change_delay'] = random.uniform(8, 25)
        
        # Add small natural variation based on time (sine wave for smooth changes)
        time_offset = (current_time - _state['base_time']) / 300  # 5-minute cycle
        natural_variation = math.sin(time_offset) * 2
        display_count = int(_state['count'] + natural_variation)
        display_count = max(613, min(702, display_count))
        
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
                'next_change_in': max(0, _state['next_change_delay'] - time_since_last_change)
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }