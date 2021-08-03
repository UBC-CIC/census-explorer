from flask import Flask

app = Flask(__name__)

@app.route('/api/census-data')
def get_census_data():
    # TODO
    return {'census-data': 'census data test'}

@app.route('/api/family-data')
def get_family_data():
    # TODO
    return {'family-data': 'family data test'}

@app.route('/api/income-data')
def get_income_data():
    # TODO
    return {'income-data': 'income data test'}