import pandas as pd
import boto3
from io import BytesIO
from subprocess import call

def lambda_handler(event, context):
    # clear tmp storage
    call("rm -rf /tmp/*", shell=True)
    
    # get census and header/population data from s3
    s3 = boto3.client("s3")
    s3.download_file((event[1])["bucket"], "step-fcn-tmp/census-add-province.csv", "/tmp/census.csv")
    headers = pd.read_csv(BytesIO(s3.get_object(Bucket=(event[1])["bucket"], Key="step-fcn-tmp/headers.csv")["Body"].read()))
    populations = pd.read_csv(BytesIO(s3.get_object(Bucket=(event[1])["bucket"], Key="step-fcn-tmp/populations.csv")["Body"].read()))

    # new file for combined census data
    open("/tmp/census-joined.csv", "w").close()
    f = open("/tmp/census-joined.csv", "a", newline='')

    for census in pd.read_csv("/tmp/census.csv", chunksize=2*2247):
        # join headers
        census = census.rename(columns={"CATEGORY": "OLD_CATEGORY"})
        census = census.merge(headers, on=["CID"]).drop(columns=["OLD_CATEGORY"])

        # join populations
        census = census.merge(populations, on=["FSA", "CID"])

        census.to_csv(f, index=False, line_terminator = '\r', header=(f.tell() == 0))

    f.close()

    # write back to s3
    s3.upload_file(Bucket=(event[1])["bucket"], Key="step-fcn-tmp/census-joined.csv", Filename="/tmp/census-joined.csv")

    return {
        "bucket": (event[1])["bucket"],
        "censusDB": (event[1])["censusDB"]
    }
    