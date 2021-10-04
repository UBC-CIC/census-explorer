import pandas as pd
from io import BytesIO
import boto3

def lambda_handler(event, context):
    # get donation data from s3
    s3 = boto3.client("s3")
    donations = pd.read_json(BytesIO(s3.get_object(Bucket=event["bucket"], Key="step-fcn-tmp/donations-combined.json")["Body"].read()), lines=True)

    province_codes = {
        "A": "NL", "B": "NS", "C": "PE", "E": "NB", "G": "QC",
        "H": "QC", "J": "QC", "K": "ON", "L": "ON", "M": "ON",
        "N": "ON", "P": "ON", "R": "MB", "S": "SK", "T": "AB",
        "V": "BC", "Y": "YT"
    }

    special_codes = {
        "Canada": "CAN",
        "X0A": "NU", "X0B": "NU", "X0C": "NU",
        "X0E": "NT", "X0G": "NT", "X1A": "NT"
    }

    donations["PROVINCE"] = donations["FSA"].apply(lambda x: special_codes[x] if x in special_codes else (
                                                                province_codes[x[0]] if x[0]in province_codes else "ERROR"))

    # write back to s3
    s3.put_object(Bucket=event["bucket"], Key="processed-data/2016donations.json", Body=donations.to_json(orient="records", lines=True))

    return {
        "bucket": event["bucket"],
        "donationDB": event["donationDB"]
    }
    