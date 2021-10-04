import pandas as pd
import boto3

def lambda_handler(event, context):
    # get census data from s3
    s3 = boto3.client("s3")
    s3.download_file(event["bucket"], "step-fcn-tmp/clean-census.csv", "/tmp/census.csv")
    
    # new tmp file for clean data
    open("/tmp/census_prov.csv", "w").close()
    f = open("/tmp/census_prov.csv", "a", newline='')

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
    
    for census in pd.read_csv("/tmp/census.csv", chunksize=2*2247):
        census["PROVINCE"] = census["FSA"].apply(lambda x: special_codes[x] if x in special_codes else (
                                                            province_codes[x[0]] if x[0]in province_codes else "ERROR"))
        census.to_csv(f, index=False, line_terminator = '\r', header=(f.tell() == 0))
        
    f.close()

    # write back to s3
    s3.upload_file(Bucket=event["bucket"], Key="step-fcn-tmp/census-add-province.csv", Filename="/tmp/census_prov.csv")
    
    return {
        "bucket": event["bucket"],
        "censusDB": event["censusDB"]
    }
    