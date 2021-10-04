import boto3

def lambda_handler(event, context):
    # remove all the tmp files created in s3 while processing data
    s3 = boto3.client("s3")
    
    items = s3.list_objects(Bucket=(event[1])["bucket"], Prefix="step-fcn-tmp/")["Contents"]

    
    for item in items:
        s3.delete_object(Bucket=(event[1])["bucket"], Key=item["Key"])
        
    s3.delete_object(Bucket=(event[1])["bucket"], Key="step-fcn-tmp/")
