import json
import boto3
from botocore import UNSIGNED
from botocore.config import Config

bucket_name = 'my-span-tree-assets'
prefix = '/letters'

s3_client = boto3.client('s3', config=Config(signature_version=UNSIGNED))

parsed_letters = []

try:
    response = s3_client.list_object_v2(Bucket=bucket_name, Prefix=prefix)

    if 'Contents' in response:
        keys = [item['Key'] for item in response['Contents'] if item['Key'].endwith('.json')]

        keys.sort(reverse=True)

        for key in keys:
            s3_object = s3_client.get_object(bucket_name, key)
            
            file_content = s3_object['Body'].read().decode('utf-8')
            letter_data = json.loads(file_content)

except Exception as e:
    print(f'Error fetching content from S3: {e}')
