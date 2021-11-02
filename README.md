# Census Explorer

## Project Overview

This prototype draws from publicly available information, more specifically the 2016 Census Canada and 2016 T1 datasets, and makes them accessible through a user-friendly interactive map. This application allows users to consume, interpret and analyze data based on parameters that are relevant to them such as: age, income and geography. This solution acknowledges that in many cases nonprofits and charities do not have the necessary tools or expertise to interpret raw data, so it aims to make the data comprehensible for users without a data science background. With this information organizations will be able to improve their decision making process regarding programming and services in areas such as fundraising, recruiting staff and allocation of resources.

## Table of Contents

| Index                                               | Description                                       |
| :-------------------------------------------------- | :------------------------------------------------ |
| [Stack Overview](#stack-overview)                   | Learn more about each stack of the application.   |
| [High Level Architecture](#high-level-architecture) | Examine the application architecture.             |
| [Deployment Guide](#deployment-guide)               | Learn how to deploy this project.                 |
| [User Guide](#user-guide)                           | Learn to use the map interface.                   |
| [Pricing Breakdown](#pricing)                       | Breakdown of how much this solution costs to run. |
| [Credits](#credits)                                 | Meet the team behind the solution.                |
| [License](#license)                                 | License details.                                  |

## Stack Overview

- **Frontend**: The ReactJS framework was used to develop the frontend of the application. AWS Amplify was used to interface with other Amazon Web Services such as: Amazon S3, AWS Lambda and Amazon DynamoDB. The library used to display the map is react-leaflet / leaflet.js, which has a GeoJSON layer attached. All other components were developed in React from scratch. For more info on the frontend, see [Frontend Architecture](./docs/FrontendArchitecture.md).

- **Data Preparation**: All data was initially processed using a AWS Step Function running a sequence of AWS Lambdas.  For more information on the data preparation process, see [Backend ETL](./docs/BackendETL.md).

- **Data Storage**: All data is saved in Amazon S3 and Amazon DynamoDB. Namely, GeoJSON files are stored in Amazon S3, and Census/T1 data is stored in Amazon DynamoDB.

- **Data Processing**: The backend has AWS Lambda functions to process incoming data from Amazon DynamoDB, fetched through a GraphQL API.

## High Level Architecture

<img src="./docs/screenshots/architecture_diagram.png">

## Application Screenshots

![heatmap](./docs/screenshots/mainUI.png)

## Deployment Guide

To deploy this solution into your AWS account, please follow the [Deployment Guide](./docs/DeploymentGuide.md).

## User Guide

Please see the [user guide](./docs/UserGuide.md).

## Pricing

Please see the [pricing breakdown](./docs/pricing.md).

## Credits

This application was architected and developed by Trevor Flanigan and Alyssa da Costa, with guidance from the [UBC CIC](https://cic.ubc.ca/) technical and project management teams.

## License

This project is distributed under the [MIT License](./LICENSE).
