import os
from flask import Flask, request

os.system('pip install requests')
import requests

app = Flask(__name__)

cloudfront = 'https://d16fwanmhq4nj5.cloudfront.net'

# note: this is for the creation of the map, NOT user download
# use province abbreviations: i.e. AB, BC, etc. (can also use CAN)
@app.route('/api/census-data/<province>', methods=['GET'])
def get_census_data(province):
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront + '/mappingcensusdata-' + province + '_reformatted.json'
    return requests.get(url=data_loc).content

@app.route('/api/family-data', methods=['GET'])
def get_family_data():
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront + '/familydonationdata2016_reformatted.json'
    return requests.get(url=data_loc).content

@app.route('/api/income-data', methods=['GET'])
def get_income_data():
    # fetch data from AWS S3 via CloudFront
    data_loc = cloudfront +'/incomedonationdata2016_reformatted.json'
    return requests.get(url=data_loc).content
