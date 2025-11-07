'''
Business: Upload image file - saves to local storage
Args: event - dict with httpMethod, body (base64 encoded image), headers
      context - object with request_id, function_name attributes
Returns: HTTP response with image URL or error
'''

import json
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    admin_token = event.get('headers', {}).get('X-Admin-Token', '')
    if admin_token != '0624':
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    if event.get('isBase64Encoded', False):
        body_str = base64.b64decode(body_str).decode('utf-8')
    
    body_data = json.loads(body_str)
    
    image_base64 = body_data.get('image', '')
    file_type = body_data.get('fileType', 'image/jpeg')
    
    if not image_base64:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'No image provided'}),
            'isBase64Encoded': False
        }
    
    if ',' in image_base64:
        image_base64 = image_base64.split(',')[1]
    
    image_bytes = base64.b64decode(image_base64)
    
    file_extension = 'jpg'
    if 'png' in file_type:
        file_extension = 'png'
    elif 'webp' in file_type:
        file_extension = 'webp'
    
    image_data_url = f"data:{file_type};base64,{base64.b64encode(image_bytes).decode('utf-8')}"
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'url': image_data_url}),
        'isBase64Encoded': False
    }