import os
from flask import Flask

os.system('pip install requests')
import requests

app = Flask(__name__)

cloudfront = 'https://d16fwanmhq4nj5.cloudfront.net'

# note: this takes about 15s to get the data
# note: this is for the creation of the map, NOT user download
@app.route('/api/census-data')
def get_census_data():
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront + '/mappingcensusdata_reformatted.json'
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
