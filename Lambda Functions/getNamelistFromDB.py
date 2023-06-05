# import the json utility package since we will be working with a JSON object
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3
# from boto3.dynamodb.conditions import Key
# from boto3.dynamodb.types import TypeDeserializer, TypeSerializer

# def from_dynamodb_to_json(item):
#     d = TypeDeserializer()
#     return {k: d.deserialize(value=v) for k, v in item.items()}

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('HelloWorldDatabase')

# fe = Key('ID').eq(' ')
# response = table.scan(FilterExpression=fe)

# response = table.scan()
# response_data = json.dumps(response)
# data = response['Items']

# data_in_jason = json.dumps(data[1:-1])
# clean_data = from_dynamodb_to_json(response)

# print(data2) 

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
# get all data from table
    # response = table.scan()
    response = table.scan()
    response_data = json.dumps(response)
    data = response['Items']
# return a properly formatted JSON object
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            # 'Access-Control-Allow-Origin': 'https://test1.d68pp857czbar.amplifyapp.com',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': data
    }
