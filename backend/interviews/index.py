'''
Business: CRUD operations for interviews (list, create, update, delete)
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id attribute
Returns: HTTP response with interviews data or operation result
'''

import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL', '')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method == 'GET':
        return handle_get(event, headers)
    
    admin_token = event.get('headers', {}).get('X-Admin-Token', '')
    if admin_token != '0624':
        return {
            'statusCode': 401,
            'headers': headers,
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        return handle_create(event, headers)
    elif method == 'PUT':
        return handle_update(event, headers)
    elif method == 'DELETE':
        return handle_delete(event, headers)
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def handle_get(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    query_params = event.get('queryStringParameters') or {}
    search = query_params.get('search', '').strip()
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if search:
        cur.execute(
            "SELECT * FROM interviews WHERE name ILIKE '%' || %s || '%' OR role ILIKE '%' || %s || '%' ORDER BY published_at DESC",
            (search, search)
        )
    else:
        cur.execute("SELECT * FROM interviews ORDER BY published_at DESC")
    
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    interviews = []
    for row in rows:
        interviews.append({
            'id': row['id'],
            'name': row['name'],
            'role': row['role'],
            'imageUrl': row['image_url'],
            'audioUrl': row['audio_url'],
            'duration': row['duration'],
            'publishedAt': row['published_at'].isoformat() if row['published_at'] else None,
            'description': row['description']
        })
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'interviews': interviews}),
        'isBase64Encoded': False
    }

def handle_create(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_str = event.get('body', '{}')
    body_data = json.loads(body_str)
    
    name = body_data.get('name', '').strip()
    role = body_data.get('role', '').strip()
    image_url = body_data.get('imageUrl', '').strip()
    audio_url = body_data.get('audioUrl', '').strip()
    duration = body_data.get('duration', '0:00').strip()
    description = body_data.get('description', '').strip()
    published_at_str = body_data.get('publishedAt', '')
    
    if not all([name, role, image_url, audio_url, duration]):
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    if published_at_str:
        published_at = datetime.fromisoformat(published_at_str.replace('Z', '+00:00'))
    else:
        published_at = datetime.now()
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        """
        INSERT INTO interviews (name, role, image_url, audio_url, duration, published_at, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id, name, role, image_url, audio_url, duration, published_at, description
        """,
        (name, role, image_url, audio_url, duration, published_at, description)
    )
    
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    interview = {
        'id': row['id'],
        'name': row['name'],
        'role': row['role'],
        'imageUrl': row['image_url'],
        'audioUrl': row['audio_url'],
        'duration': row['duration'],
        'publishedAt': row['published_at'].isoformat() if row['published_at'] else None,
        'description': row['description']
    }
    
    return {
        'statusCode': 201,
        'headers': headers,
        'body': json.dumps({'interview': interview}),
        'isBase64Encoded': False
    }

def handle_update(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_str = event.get('body', '{}')
    body_data = json.loads(body_str)
    
    interview_id = body_data.get('id')
    if not interview_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Interview ID is required'}),
            'isBase64Encoded': False
        }
    
    name = body_data.get('name', '').strip()
    role = body_data.get('role', '').strip()
    image_url = body_data.get('imageUrl', '').strip()
    audio_url = body_data.get('audioUrl', '').strip()
    duration = body_data.get('duration', '').strip()
    description = body_data.get('description', '').strip()
    published_at_str = body_data.get('publishedAt', '')
    
    if not all([name, role, image_url, audio_url, duration]):
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    if published_at_str:
        published_at = datetime.fromisoformat(published_at_str.replace('Z', '+00:00'))
    else:
        published_at = datetime.now()
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        """
        UPDATE interviews 
        SET name = %s, role = %s, image_url = %s, audio_url = %s, 
            duration = %s, published_at = %s, description = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        RETURNING id, name, role, image_url, audio_url, duration, published_at, description
        """,
        (name, role, image_url, audio_url, duration, published_at, description, interview_id)
    )
    
    row = cur.fetchone()
    
    if not row:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Interview not found'}),
            'isBase64Encoded': False
        }
    
    conn.commit()
    cur.close()
    conn.close()
    
    interview = {
        'id': row['id'],
        'name': row['name'],
        'role': row['role'],
        'imageUrl': row['image_url'],
        'audioUrl': row['audio_url'],
        'duration': row['duration'],
        'publishedAt': row['published_at'].isoformat() if row['published_at'] else None,
        'description': row['description']
    }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'interview': interview}),
        'isBase64Encoded': False
    }

def handle_delete(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    query_params = event.get('queryStringParameters') or {}
    interview_id = query_params.get('id')
    
    if not interview_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Interview ID is required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("DELETE FROM interviews WHERE id = %s", (interview_id,))
    deleted_count = cur.rowcount
    
    conn.commit()
    cur.close()
    conn.close()
    
    if deleted_count == 0:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Interview not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True}),
        'isBase64Encoded': False
    }
