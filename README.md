# Census Explorer

## Project Overview

This prototype draws from publicly available information, more specifically the 2016 Census Canada and 2016 T1 datasets, and makes them accessible through a user-friendly interactive map. This application allows users to consume, interpret and analyze data based on parameters that are relevant to them such as: age, income and geography. This solution acknowledges that in many cases nonprofits and charities do not have the necessary tools or expertise to interpret raw data, so it aims to make the data comprehensible for users without a data science background. With this information organizations will be able to improve their decision making process regarding programming and services in areas such as fundraising, recruiting staff and allocation of resources.

## Table of Contents

| Index                                               | Description                                     |
| :-------------------------------------------------- | :---------------------------------------------- |
| [Stack Overview](#stack-overview)                   | Learn more about each stack of the application. |
| [High Level Architecture](#high-level-architecture) | Examine the application architecture.           |
| [Deployment Guide](#deployment-guide)               | Learn how to deploy this project.               |
| [User Guide](#user-guide)                           | Learn to use the map interface.                 |
| [Credits](#credits)                                 | Meet the team behind the solution.              |
| [License](#license)                                 | License details.                                |

## Stack Overview

- **Frontend**: The ReactJS framework was used to develop the frontend of the application. AWS Amplify was used to interface with other Amazon Web Services such as: Amazon S3, AWS Lambda and Amazon DynamoDB. The library used to display the map is react-leaflet / leaflet.js, which has a GeoJSON layer attached. All other components were developed in React from scratch.

- **Data Preparation**: All data was initially processed using a AWS Step Function running a sequence of AWS Lambdas.

- **Data Storage**: All data is saved in Amazon S3 and Amazon DynamoDB. Namely, GeoJSON files are stored in Amazon S3, and Census/T1 data is stored in Amazon DynamoDB.

- **Data Processing**: The backend has AWS Lambda functions to process incoming data from Amazon DynamoDB, fetched through a GraphQL API.

## High Level Architecture

<img src="./docs/screenshots/architecture_diagram.png">

## Application Screenshots

![heatmap](./docs/screenshots/mainUI.png)

### Datasets

- **Census Data**: The 2016 Census data contains various statistics from the Canadian Census, such as Age, Sex, Type of Dwelling, Families, Households, Marital Status, Language, Income, Immigration and Ethnocultural Diversity, Housing, Aboriginal Peoples, Education, Labour, Journey to Work, Mobility and Migration, and Language of Work for Canada and Forward Sortation Areas. Each statistic is aggregated by Forward Sortation Area (FSA). This data was obtained from the [Statistics Canada website](https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/download-telecharger/comp/page_dl-tc.cfm?Lang=E).

- **T1 Donation Data by Family Type**: The T1 Donation Data by Family Type contains data about the charitable donations made by different family types. This includes total amount donated, median donation amount, number of donations made, and donation rate. Each statistic is aggregated by Forward Sortation Area (FSA).

- **T1 Donation Data by Income Group**: The T1 Donation Data by Income Group contains data about the charitable donations made by different income groups. This includes total amount donated, median donation amount, number of donations made, and donation rate. Each statistic is aggregated by Forward Sortation Area (FSA).

### Manual Data Processing

The file headers.csv in the data folder was created by copying the table from [Statistics Canada](https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/page.cfm?Lang=E&Geo1=PR&Code1=01&Geo2=&Code2=&SearchText=Canada&SearchType=Begins&SearchPR=01&B1=All&TABID=1&type=0) into a spreadsheet in order to find the category groupings that were not otherwise represented in the Census data. After copying the table, the actual statistics were removed, and each category was marked with whether or not it would be kept for the app. Each category was numbered from 1 to 2247, corresponding to the ID given in the Census data (and ID was necessary as the categories do not have unique names). The file was then saved as a csv and used for further processing withing the data preparation step function.

## Deployment Guide

To deploy this solution into your AWS account, please follow the [Deployment Guide](https://github.com/UBC-CIC/census-explorer-backend/blob/master/docs/DeploymentGuide.md).

## User Guide

Please see the [user guide](https://github.com/UBC-CIC/census-explorer-frontend/blob/master/docs/UserGuide.md).

## Credits

This application was architected and developed by Trevor Flanigan and Alyssa da Costa, with guidance from the [UBC CIC](https://cic.ubc.ca/) technical and project management teams.

## License

This project is distributed under the [MIT License](./LICENSE).
