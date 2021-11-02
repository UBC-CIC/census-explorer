# Pricing Breakdown

## Overview

Use case for the application usage: 1000 sessions per month performing 20 queries (being a T1 or Census information for ALL FSA).
Total cost per month: $16.19

## Assumptions

- The main costs are coming from Amazon DynamoDB.
- 1000 sessions per month, each session with 20 queries and 10 similar searches.
- Costs are taken from [AWS DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)

## Data Sizing

- Total number of rows in T1 data: 21333
- Total number of rows in Census data: 753678
- Number of FSAs in Canada: 1620

The Census and T1 data ingestion and data transformation occurs only once and the lambda costs and storage of the data for this process is negligible.
Note: The entire T1 Dataset is queried and cached at the beginning of a session.

## Query Costs:

- Cost of Reading Entire T1 Database: $0.005866575
- Cost per Census Query (all FSAs): $0.0004455
- Cost for 20 Queries of Each Category: $0.014776575
- Cost for 1000 Sessions Per Month: $14.776575
- Cost of a Similar Search: $0.000141075 (Reads data for entire province)
- Cost for 10 Similar Searches: $0.00141075
- Cost for 10000 Similar Searches Per Month: $1.41075

**Total Cost: $16.187325**
