# Requirements
For deployment:
* [AWS Account](https://aws.amazon.com/account/)
* [GitHub Account](https://github.com/)
* [Amplify](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#quickstart) # TODO: remove this if we have a separate frontend deployment guide
* [Node](https://nodejs.org/en/download/) # TODO: remove this if we have a separate frontend deployment guide
* [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* [Docker](https://docs.docker.com/install/)

For prototyping:
* [Python 3.7 or greater](https://realpython.com/installing-python/) 

# Step 0: Request T1 data from Statistics Canada
1. Go to the [Statistics Canada website]() and request ... # TODO

# Step 1: Front-end Deployment
See the [front-end deployment guide]() # TODO: add link or integrate

# Step 2: Backend/Data Preparation Deployment
## Step 2.1: Clone this repository
## Step 2.2: Create an S3 bucket for data
1. Log into the S3 management console.
2. Click on the **Create Bucket** button.  Give the bucket a unique name, and select your region.  Make sure you save the bucket name and remember which region you selected, as you will need both later.  Accept the rest of the default settings and select **Create bucket**.

## Step 2.3: Add a helper file for data preparation
1. Log in to the S3 management console.
2. Select the bucket you created in step 2.2.  Click **Create folder**, and name it "unprocessed-data".
3. Select the new *unprocessed-data* folder.  Click **Upload**, and add the "headers.csv" file from the data directory in this repository.

## Step 2.4: Create lambda layer
1. In a terminal in the layers directory, run the create_layer.sh bash script.  This will create a lambda layer that will be used in the CloudFormation layer deployed in step 2.4 to allow our lambdas access to certain Python libraries.
2. Verify that you now have a file called lambda_layer.zip in the layers directory.

## Step 2.5: Deploy CloudFormation template
1. In a terminal in the project root directory, enter the following command.  This will guide you through the deployment process.  Make sure you set *DataBucketName* to the name of the bucket you created in step 2.2, and that *AWS Region* is set to the same region you created your bucket in.  This will create a step function and the lambdas it triggers to fetch and prepare the census and T1 data.
```bash
sam deploy --template step-fcn-template.yaml --guided
```
<img src="../images/step2.5.png">

**Note:** Make sure this step completes successfully before moving on to the next step.

## Step 2.6: Trigger data preparation Step Function
1. Log in to the Lambda management console.  Select **Step functions state machines** from the menu on the left.
2. Select the state machine - the name should start with "DataProcessingStateMachine-".
3. Click **Execute**.  Leave all settings at default.

Once the state machine finishes executing successfully, backend deployment and data preparation is complete!