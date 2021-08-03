from flask import Flask

import pandas as pd
import requests

app = Flask(__name__)

cloudfront = 'https://d16fwanmhq4nj5.cloudfront.net'

# note: this takes about 25s to get the data
@app.route('/api/census-data')
def get_census_data():
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront + '/censusdata_reformatted.json'
    return requests.get(url=data_loc).content

@app.route('/api/family-data')
def get_family_data():
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront + '/familydonationdata2016_reformatted.json'
    return requests.get(url=data_loc).content

@app.route('/api/income-data')
def get_income_data():
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront +'/incomedonationdata2016_reformatted.json'
    return requests.get(url=data_loc).content