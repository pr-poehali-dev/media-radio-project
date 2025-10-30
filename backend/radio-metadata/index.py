import json
import urllib.request
from typing import Dict, Any

def parse_icy_metadata(metadata_bytes: bytes) -> str:
    try:
        metadata_str = metadata_bytes.decode('utf-8', errors='ignore')
        if 'StreamTitle=' in metadata_str:
            start = metadata_str.index('StreamTitle=') + 13
            end = metadata_str.index(';', start) if ';' in metadata_str[start:] else len(metadata_str)
            title = metadata_str[start:end].strip("'\"")
            return title if title else None
    except:
        pass
    return None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get current track information from radio stream
    Args: event with httpMethod
    Returns: JSON with track title and artist
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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        try:
            stats_url = 'https://myradio24.org/stats?sid=1&json=1'
            stats_req = urllib.request.Request(stats_url)
            stats_req.add_header('User-Agent', 'Mozilla/5.0')
            
            with urllib.request.urlopen(stats_req, timeout=5) as stats_response:
                stats_data = json.loads(stats_response.read().decode('utf-8'))
                track_info = stats_data.get('songtitle', 'КонтентМедиаPRO - Прямой эфир')
                
                if not track_info or track_info.strip() == '':
                    track_info = 'КонтентМедиаPRO - Прямой эфир'
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'no-cache, no-store, must-revalidate'
                    },
                    'body': json.dumps({
                        'track': track_info
                    }, ensure_ascii=False),
                    'isBase64Encoded': False
                }
                
        except Exception as e:
            try:
                req = urllib.request.Request('https://myradio24.org/54137')
                req.add_header('Icy-MetaData', '1')
                req.add_header('User-Agent', 'Mozilla/5.0')
                
                with urllib.request.urlopen(req, timeout=5) as response:
                    metaint = response.headers.get('icy-metaint')
                    track_info = 'КонтентМедиаPRO - Прямой эфир'
                    
                    if metaint:
                        metaint = int(metaint)
                        audio_data = response.read(metaint)
                        metadata_length_byte = response.read(1)
                        
                        if metadata_length_byte:
                            metadata_length = metadata_length_byte[0] * 16
                            if metadata_length > 0:
                                metadata = response.read(metadata_length)
                                parsed_title = parse_icy_metadata(metadata)
                                if parsed_title:
                                    track_info = parsed_title
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Cache-Control': 'no-cache, no-store, must-revalidate'
                        },
                        'body': json.dumps({
                            'track': track_info
                        }, ensure_ascii=False),
                        'isBase64Encoded': False
                    }
            except:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'no-cache, no-store, must-revalidate'
                    },
                    'body': json.dumps({
                        'track': 'КонтентМедиаPRO - Прямой эфир'
                    }, ensure_ascii=False),
                    'isBase64Encoded': False
                }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }