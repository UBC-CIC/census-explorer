import urllib.request
from zipfile import ZipFile
import boto3

def lambda_handler(event, context):
    # connect to s3
    s3 = boto3.client("s3")

    # get bucket name from ssm
    ssm = boto3.client("ssm")
    bucket = ssm.get_parameter(Name="/censusexplorer/bucketName")["Parameter"]["Value"]

    # get census data from StatCan website
    urllib.request.urlretrieve("https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/download-telecharger/comp/GetFile.cfm?Lang=E&FILETYPE=CSV&GEONO=046", "/tmp/census.zip")

    # extract the contents of the zip folder and upload only the data itself to s3
    with ZipFile("/tmp/census.zip", "r") as zip_file:
        zip_file.extractall("/tmp/")
    s3.upload_file(Bucket=bucket, Key="unprocessed-data/FSA_CSV_data.csv", Filename="/tmp/98-401-X2016046_English_CSV_data.csv")

    # get T1 data from ??? and upload to s3

    # s3.upload_file(Bucket=bucket, Key="unprocessed-data/Donations by Family Type - 2006 to 2018 (FSAs).csv", Filename="/tmp/Donations by Family Type - 2006 to 2018 (FSAs).csv")
    # s3.upload_file(Bucket=bucket, Key="unprocessed-data/Donations by Income Group - 2006 to 2018 (FSAs).csv", Filename="/tmp/Donations by Income Group - 2006 to 2018 (FSAs).csv")
    
    # get the names of the DynamoDB tables from ssm
    censusDB = ssm.get_parameter(Name="/censusexplorer/censusDB")
    donationDB = ssm.get_parameter(Name="/censusexplorer/donationDB")

    return {
        "bucket": bucket,
        "censusDB": censusDB["Parameter"]["Value"],
        "donationDB": donationDB["Parameter"]["Value"]
    }
