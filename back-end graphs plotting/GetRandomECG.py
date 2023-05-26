import boto3
import botocore
import json
import os
import random
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3 = boto3.resource('s3')

def lambda_handler(event, context):
    logger.info("New files uploaded to the source bucket.")

    #introduce random integer to randomly retrieve ecg graph from 'ecg-plots-bucket'
    key = 'ecg_plot_' + str(random.randint(0,494)) + '.html'
    #input bucket
    source_bucket = 'ecg-plots-bucket'
    #outputbucket of randomly retrieved ecg graph
    destination_bucket = 'matplotnumpybucket'

    source = {'Bucket': source_bucket, 'Key': key}

    try:
        response = s3.meta.client.copy(source, destination_bucket, 'ECG')
        logger.info("File copied to the destination bucket successfully!")

    except botocore.exceptions.ClientError as error:
        logger.error("There was an error copying the file to the destination bucket")
        print('Error Message: {}'.format(error))

    except botocore.exceptions.ParamValidationError as error:
        logger.error("Missing required parameters while calling the API.")
        print('Error Message: {}'.format(error))
