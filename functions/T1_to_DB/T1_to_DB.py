import pandas as pd
import numpy as np
from io import BytesIO
import boto3
from decimal import Decimal

def lambda_handler(event, context):
    # connect to the table in DynamoDB
    dynamodb = boto3.Session().resource("dynamodb")
    table = dynamodb.Table(event["donationDB"])

    # grab donation data
    s3 = boto3.client("s3")
    donations = pd.read_json(BytesIO(s3.get_object(Bucket=event["bucket"], Key="processed-data/2016donations.json")["Body"].read()), lines=True)

    # batch write to DynamoDB
    with table.batch_writer() as batch:
        for index, row in donations.iterrows():
            batch.put_item(Item={
                "id": (row["FSA"] + "#" + row["TYPE"]),
                "__typename": "DonationData",
                "FSA": row["FSA"],
                "TYPE": row["TYPE"],
                "PROVINCE": row["PROVINCE"],
                "NUM_FAM": (None if np.isnan(row["NUM_FAM"]) else Decimal(str(row["NUM_FAM"]))),
                "TOT_DONS": (None if np.isnan(row["TOT_DONS"]) else Decimal(str(row["TOT_DONS"]))),
                "NUM_DONS": (None if np.isnan(row["NUM_DONS"]) else Decimal(str(row["NUM_DONS"]))),
                "MEDIAN_DON": (None if np.isnan(row["MEDIAN_DON"]) else Decimal(str(row["MEDIAN_DON"]))),
                "DON_RATE": (None if np.isnan(row["DON_RATE"]) else Decimal(str(row["DON_RATE"])))
            })
