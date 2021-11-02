import pandas as pd
import boto3
from subprocess import call

def lambda_handler(event, context):
    # clear tmp storage
    call("rm -rf /tmp/*", shell=True)
    
    # get census and header data from s3
    s3 = boto3.client("s3")
    s3.download_file(event["bucket"], "step-fcn-tmp/census-joined.csv", "/tmp/census.csv")
    
    # new tmp file for final data
    open("/tmp/census_processed.json", "w").close()
    f = open("/tmp/census_processed.json", "a")

    for census in pd.read_csv("/tmp/census.csv", chunksize=5000):
        census["TOTAL_PERCENT"] = census["TOTAL_COUNT"] / census["POPULATION"] * 100
        census["TOTAL_PERCENT"] = census.apply(lambda x: x["TOTAL_COUNT"] if (x["CATEGORY"].find("Average") != -1 or x["CATEGORY"].find("Median") != -1 or 
                                                                                x["CATEGORY"].find("change") != -1 or x["CATEGORY"].find("(%)") != -1 or 
                                                                                x["CATEGORY"].find("% of") != -1 or x["CATEGORY"].find(" rate") != -1 or 
                                                                                x["CATEGORY"].find("density") != -1 or x["CATEGORY"].find("(percentage)") != -1 or 
                                                                                x["CATEGORY"].find("Percentage") != -1 or x["CATEGORY"].find("Land area") != -1) else x["TOTAL_PERCENT"], axis=1)
        census = census.drop(columns=["POPULATION"])
        
        census.to_json(f, orient="records", lines=True)
        
    f.close()

    # write back to s3
    s3.upload_file(Bucket=event["bucket"], Key="processed-data/2016census.json", Filename="/tmp/census_processed.json")

    return {
        "bucket": event["bucket"],
        "censusDB": event["censusDB"]
    }
    