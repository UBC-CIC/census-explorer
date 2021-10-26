import pandas as pd
import numpy as np
import boto3
from subprocess import call

def lambda_handler(event, context):
    # clear tmp storage
    call("rm -rf /tmp/*", shell=True)
    
    # get census and header data from s3
    s3 = boto3.client("s3")
    s3.download_file(event["bucket"], "step-fcn-tmp/clean-census.csv", "/tmp/census.csv")
    s3.download_file(event["bucket"], "unprocessed-data/headers.csv", "/tmp/headers.csv")
    categories = pd.read_csv("/tmp/headers.csv")
    categories = categories.astype({"CATEGORY": "string", "KEEP": "string", "NEW_NAME": "string"})

    # clean up some hyperlinks that merged with the data during the copy-paste
    categories["CATEGORY"] = categories["CATEGORY"].apply(lambda x: x[:x.find("Census data footnote")] if (x.find("Census data footnote") != -1) else (
                                                                    x[:x.find("Update of the 2016 Census")] if (x.find("Update of the 2016 Census") != -1) else x))

    # add headers to each category
    categories['HEADER'] = ""

    curr_hdr = ""
    for i in range(0, categories.shape[0]):
        if(np.isnan(categories.loc[i, "CID"])):
            curr_hdr = categories.loc[i, "CATEGORY"]
        else:
            categories.loc[i, "HEADER"] = curr_hdr
        
    # get rid of all the rows that are for the headers (have no CID)
    categories = categories.dropna(subset=["CID"]).reset_index(drop=True)

    # replace any necessary category names with the NEW_NAME
    categories["CATEGORY"] = categories.apply(lambda x: x["CATEGORY"] if pd.isna(x["NEW_NAME"]) else x["NEW_NAME"], axis=1)

    # find all population totals
    categories["IS_TOTAL"] = categories["CATEGORY"].apply(lambda x: True if x.startswith("Population, 2016") or x.startswith("Total -") or x.startswith("In low income") else False)

    # map population cids to each cid
    categories["POPULATION_CID"] = 0

    curr_pop_cid = 1
    for i in range(0, len(categories)):
        if (categories.loc[i, "IS_TOTAL"]):
            curr_pop_cid = categories.loc[i, "CID"]
        categories.loc[i, "POPULATION_CID"] = curr_pop_cid

    # remove any cids we don't intend to use
    categories = categories[categories["KEEP"] == "T"]

    # drop all extra columns
    categories = categories.drop(columns=["NEW_NAME", "IS_TOTAL", "KEEP"])
    
    # write header file
    categories.drop(columns=["POPULATION_CID"]).to_csv("/tmp/hdrs.csv", index=False)
    
    # can now drop headers and categories as well
    categories = categories.drop(columns=["HEADER", "CATEGORY"])
    
    # new tmp file for population data
    open("/tmp/populations.csv", "w").close()
    f = open("/tmp/populations.csv", "a", newline='')

    # add the total population for each cid
    for census in pd.read_csv("/tmp/census.csv", chunksize=2*2247):
        census = census.drop(columns=["GNR", "GNR_LF", "DATA_QUALITY_FLAG", "CATEGORY", "MALE_COUNT", "FEMALE_COUNT"])
        census = census.astype({"CID": float})
        populations = categories.merge(census, left_on=["POPULATION_CID"], right_on=["CID"], suffixes=(None, "_y"))
        populations = populations.drop(columns=["CID_y", "POPULATION_CID"]).rename(columns={"TOTAL_COUNT": "POPULATION"})
        populations.to_csv(f, index=False, line_terminator = '\r', header=(f.tell() == 0))
        
    f.close()

    # write back to s3
    s3.upload_file(Bucket=event["bucket"], Key="step-fcn-tmp/headers.csv", Filename="/tmp/hdrs.csv")
    s3.upload_file(Bucket=event["bucket"], Key="step-fcn-tmp/populations.csv", Filename="/tmp/populations.csv")
    