import pandas as pd
import numpy as np
import boto3
from decimal import Decimal

def lambda_handler(event, context):
    # connect to the table in DynamoDB
    dynamodb = boto3.Session().resource("dynamodb")
    table = dynamodb.Table(event["censusDB"])

    # grab donation data
    s3 = boto3.client("s3")
    s3.download_file(event["bucket"], "processed-data/2016census.json", "/tmp/census.json")

    # batch write to DynamoDB
    with table.batch_writer() as batch:
        for census in pd.read_json("/tmp/census.json", lines=True, chunksize=10000):
            for index, row in census.iterrows():
                batch.put_item(Item={
                    "id": (row["FSA"] + "#" + str(row["CID"])),
                    "__typename": "CensusData",
                    "FSA": row["FSA"],
                    "PROVINCE": row["PROVINCE"],
                    "HEADER": row["HEADER"],
                    "CID": row["CID"],
                    "CATEGORY": row["CATEGORY"],
                    "TOTAL_COUNT": (None if np.isnan(row["TOTAL_COUNT"]) else Decimal(str(row["TOTAL_COUNT"]))),
                    "TOTAL_PERCENT": (None if np.isnan(row["TOTAL_PERCENT"]) else Decimal(str(row["TOTAL_PERCENT"]))),
                    "MALE_COUNT": (None if np.isnan(row["MALE_COUNT"]) else Decimal(str(row["MALE_COUNT"]))),
                    "FEMALE_COUNT": (None if np.isnan(row["FEMALE_COUNT"]) else Decimal(str(row["FEMALE_COUNT"])))
                })
            
    return {
        "bucket": event["bucket"]
    }
   