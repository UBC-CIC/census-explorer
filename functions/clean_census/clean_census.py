import pandas as pd
import numpy as np
import boto3
from subprocess import call

def lambda_handler(event, context):
    # clear tmp storage
    call("rm -rf /tmp/*", shell=True)

    # get census data from s3
    s3 = boto3.client("s3")
    s3.download_file(event["bucket"], "unprocessed-data/census_data.csv", "/tmp/census.csv")
    
    # new tmp file for clean data
    open("/tmp/clean_census.csv", "w").close()
    f = open("/tmp/clean_census.csv", "a", newline='')

    for census in pd.read_csv("/tmp/census.csv", chunksize=2*2247):
        # drop unnecessary columns
        census = census.drop(columns=["CENSUS_YEAR", "GEO_CODE (POR)", "GEO_LEVEL", "ALT_GEO_CODE", "Notes: Profile of Forward Sortation Areas (2247)"])

        # rename columns for clarity
        census = census.rename(columns={"GEO_NAME": "FSA", "DIM: Profile of Forward Sortation Areas (2247)": "CATEGORY", 
                                "Member ID: Profile of Forward Sortation Areas (2247)": "CID", "Dim: Sex (3): Member ID: [1]: Total - Sex": "TOTAL_COUNT", 
                                "Dim: Sex (3): Member ID: [2]: Male": "MALE_COUNT", "Dim: Sex (3): Member ID: [3]: Female": "FEMALE_COUNT"})

        # remove '...', '.x', and 'F' occurrences in the data
        census = census.astype({"TOTAL_COUNT": "string", "MALE_COUNT": "string", "FEMALE_COUNT": "string"})
        census["TOTAL_COUNT"] = census["TOTAL_COUNT"].apply(lambda x: np.nan if (x == "..." or x == "x" or x =="F") else x)
        census["MALE_COUNT"] = census["MALE_COUNT"].apply(lambda x: np.nan if (x == "..." or x == "x" or x == "F") else x)
        census["FEMALE_COUNT"] = census["FEMALE_COUNT"].apply(lambda x: np.nan if (x == "..." or x == "x" or x == "F") else x)
        census = census.astype({"TOTAL_COUNT": float, "MALE_COUNT": float, "FEMALE_COUNT": float})
        
        census.to_csv(f, index=False, line_terminator = '\r', header=(f.tell() == 0))


    f.close()
    
    # write back to s3
    s3.upload_file(Bucket=event["bucket"], Key="step-fcn-tmp/clean-census.csv", Filename="/tmp/clean_census.csv")

    return {
        "bucket": event["bucket"],
        "censusDB": event["censusDB"]
    }
    