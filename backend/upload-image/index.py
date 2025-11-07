'''
Business: Upload image file to cloud storage
Args: event - dict with httpMethod, body (base64 encoded image), headers
      context - object with request_id, function_name attributes
Returns: HTTP response with image URL or error
'''

import json
import base64
import uuid
import os
from typing import Dict, Any
import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client(
    's3',
    endpoint_url='https://storage.yandexcloud.net',
    region_name='ru-central1'
)

BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'poehali-images')
PROJECT_ID = os.environ.get('PROJECT_ID', 'default')

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
    
    file_name = f"interview_{uuid.uuid4().hex}.{file_extension}"
    file_path = f"{PROJECT_ID}/{file_name}"
    
    try:
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file_path,
            Body=image_bytes,
            ContentType=file_type,
            ACL='public-read'
        )
        
        image_url = f"https://storage.yandexcloud.net/{BUCKET_NAME}/{file_path}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'url': image_url}),
            'isBase64Encoded': False
        }
    
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Upload failed: {str(e)}'}),
            'isBase64Encoded': False
        }
