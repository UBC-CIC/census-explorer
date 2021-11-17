import urllib.request
from zipfile import ZipFile
import boto3
from os import getenv

def lambda_handler(event, context):
    # connect to s3
    s3 = boto3.client("s3")

    # get census data from StatCan website
    urllib.request.urlretrieve("https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/download-telecharger/comp/GetFile.cfm?Lang=E&FILETYPE=CSV&GEONO=046", "/tmp/census.zip")

    # extract the contents of the zip folder and upload only the data itself to s3
    with ZipFile("/tmp/census.zip", "r") as zip_file:
        zip_file.extractall("/tmp/")
    s3.upload_file(Bucket=getenv("BucketName"), Key="unprocessed-data/census_data.csv", Filename="/tmp/98-401-X2016046_English_CSV_data.csv")
    
    # get the names of the DynamoDB tables from ssm
    ssm = boto3.client("ssm")
    censusDB = ssm.get_parameter(Name="/amplify/" + getenv("AmplifyAppName") + "/" + getenv("AmplifyBackendEnv") + "/censusDB")
    donationDB = ssm.get_parameter(Name="/amplify/" + getenv("AmplifyAppName") + "/" + getenv("AmplifyBackendEnv") + "/donationDB")

    return {
        "bucket": getenv("BucketName"),
        "censusDB": censusDB["Parameter"]["Value"],
        "donationDB": donationDB["Parameter"]["Value"]
    }
