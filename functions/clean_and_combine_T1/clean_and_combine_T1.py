import pandas as pd
import numpy as np
from io import BytesIO
import boto3

def lambda_handler(event, context):
    # get donation data from s3
    s3 = boto3.client("s3")
    items = s3.list_objects(Bucket=event["bucket"], Prefix="unprocessed-data/")["Contents"]
    donations = [item["Key"] for item in items if (item["Key"] != "unprocessed-data/headers.csv" and item["Key"] != "unprocessed-data/census_data.csv" and item["Key"] != "unprocessed-data/")]
    
    donations = [pd.read_csv(BytesIO(s3.get_object(Bucket=event["bucket"], Key=donation)["Body"].read())) for donation in donations]

    # combine both datasets into one
    donations = [(donation.rename(columns={"FamilyType": "TYPE"}) if "FamilyType" in donation.columns else donation.rename(columns={"IncomeGroup": "TYPE"})) for donation in donations]
    donations = pd.concat(donations, ignore_index=True)

    # remove unnecessary columns
    donations = donations.drop(columns=["Place", "Name_EN", "Name_FR"])

    # rename columns for continuity with census data
    donations = donations.rename(columns={"NumFam": "NUM_FAM", "TotDons": "TOT_DONS", 
                                            "NumDons": "NUM_DONS", "MedianDon": "MEDIAN_DON", 
                                            "DonRate": "DON_RATE"})

    # only keep data from 2016
    donations = donations[donations["Year"] == 2016].drop(columns=["Year"])

    # clean up any '.x' occurrences in numerical columns
    donations["NUM_FAM"] = donations["NUM_FAM"].apply(lambda x: np.nan if x == ".x" else x)
    donations["TOT_DONS"] = donations["TOT_DONS"].apply(lambda x: np.nan if x == ".x" else x)
    donations["NUM_DONS"] = donations["NUM_DONS"].apply(lambda x: np.nan if x == ".x" else x)
    donations["MEDIAN_DON"] = donations["MEDIAN_DON"].apply(lambda x: np.nan if x == ".x" else x)
    donations = donations.astype({"NUM_FAM": float, "TOT_DONS": float, 
                                    "NUM_DONS": float, "MEDIAN_DON": float})
                                    
    # Change TYPE column to use caps and underscores
    type_codes = {
        "Couple with children": "COUPLE_WITH_CHILDREN",
        "Lone-parent families": "LONE_PARENT_FAMILIES",
        "Couple without children": "COUPLE_WITHOUT_CHILDREN",
        "Persons not in census families": "PERSONS_NOT_IN_CENSUS_FAMILIES",
        "<$20K": "l20K",
        "$20K < $40K": "l40K",
        "$40K < $60K": "l60K",
        "$60K < $80K": "l80K",
        "$80K < $100K": "l100K",
        "$100K < $150K": "l150K",
        "$150K < $200K": "l200K",
        " $200K < $250K": "l250K", # the space is intentional
        ">= $250K": "ge250K",
    }
    donations["TYPE"] = donations["TYPE"].apply(lambda x: type_codes[x] if x in type_codes else "ERROR")
    
    # write back to s3
    s3.put_object(Bucket=event["bucket"], Key="step-fcn-tmp/donations-combined.json", Body=donations.to_json(orient="records", lines=True))
    
    return {
        "bucket": event["bucket"],
        "donationDB": event["donationDB"]
    }
    