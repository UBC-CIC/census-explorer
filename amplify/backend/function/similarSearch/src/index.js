/* Amplify Params - DO NOT EDIT
	API_CENSUSEXPLORER_GRAPHQLAPIENDPOINTOUTPUT
	API_CENSUSEXPLORER_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
  // TODO implement
  const { FSAs, CID, TYPE } = event.arguments;
  if (!CID && !TYPE) {
    return {
      statusCode: 400,
      error: "At least one of CID or TYPE is required for SimilarSearch",
    };
  }

  if (CID) {
    //   Do Census Nearest Neighbor using CID
  }
  if (TYPE) {
    //   Donation Nearest Neighbor using Type
  }
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
