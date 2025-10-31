"""
Business: Provides synchronized listener count for all users
Args: event with httpMethod; context with request_id
Returns: Current listener count for the radio station
"""

import json
import time
import random
from typing import Dict, Any

# Global state to track listener count and last update
_state = {
    'count': 613 + random.randint(0, 89),  # Random initial value between 613-702
    'last_update': time.time()
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
        
        # Update count every 10-20 seconds
        if current_time - _state['last_update'] >= 10:
            change = 1 if random.random() > 0.5 else -1
            amount = random.randint(1, 3)
            new_count = _state['count'] + (change * amount)
            
            # Keep within bounds
            _state['count'] = max(613, min(702, new_count))
            _state['last_update'] = current_time
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'count': _state['count'],
                'timestamp': current_time
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
