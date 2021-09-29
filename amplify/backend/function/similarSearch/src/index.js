/* Amplify Params - DO NOT EDIT
	API_CENSUSEXPLORER_CENSUSDATAENTRYTABLE_ARN
	API_CENSUSEXPLORER_CENSUSDATAENTRYTABLE_NAME
	API_CENSUSEXPLORER_DONATIONDATAENTRYTABLE_ARN
	API_CENSUSEXPLORER_DONATIONDATAENTRYTABLE_NAME
	API_CENSUSEXPLORER_GRAPHQLAPIENDPOINTOUTPUT
	API_CENSUSEXPLORER_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

// Arbritrary distances chosen from testing
const DEFAULT_RATE_DISTANCE = 0.005; // If a percentage is within +-0.5%, it is deemed to be similar
const DEFAULT_FLAT_DISTANCE = 100;
const {
  API_CENSUSEXPLORER_GRAPHQLAPIENDPOINTOUTPUT,
  API_CENSUSEXPLORER_GRAPHQLAPIIDOUTPUT,
  ENV,
  REGION,
  API_CENSUSEXPLORER_CENSUSDATAENTRYTABLE_ARN: censusTableArn,
  API_CENSUSEXPLORER_CENSUSDATAENTRYTABLE_NAME: censusTableName,
  API_CENSUSEXPLORER_DONATIONDATAENTRYTABLE_ARN: donationTableArn,
  API_CENSUSEXPLORER_DONATIONDATAENTRYTABLE_NAME: donationTableName,
} = process.env;

const generateDonationQueryInput = (type, fsa) => {
  const queryInput = {
    TableName: donationTableName,
    IndexName: "donationDataByTypeFSA",
    KeyConditionExpression: "#type = :type AND FSA = :fsa",
    ExpressionAttributeNames: {
      "#type": "TYPE",
    },
    ExpressionAttributeValues: {
      ":type": type,
      ":fsa": fsa,
    },
  };
  return queryInput;
};

const generateCensusQueryInput = (cid, fsa) => {
  const queryInput = {
    TableName: censusTableName,
    KeyConditionExpression: "CID = :cid AND FSA = :fsa",
    ExpressionAttributeValues: {
      ":cid": cid,
      ":fsa": fsa,
    },
  };
  return queryInput;
};

// Do a TYPE#FSA query in order to get the province of the selected FSA
const slowGetProvinceFromFSA = async (fsa) => {
  const query1 = generateDonationQueryInput("COUPLE_WITH_CHILDREN", fsa);
  let res1 = await docClient.query(query1).promise();
  if (res1.Items.length >= 1) return res1.Items[0]["PROVINCE"];
  const query2 = generateDonationQueryInput("LONE_PARENT_FAMILIES", fsa);
  let res2 = await docClient.query(query2).promise();
  if (res2.Items.length >= 1) return res2.Items[0]["PROVINCE"];
  const query3 = generateDonationQueryInput("COUPLE_WITHOUT_CHILDREN", fsa);
  let res3 = await docClient.query(query3).promise();
  if (res3.Items.length >= 1) return res3.Items[0]["PROVINCE"];
  const query4 = generateDonationQueryInput(
    "PERSONS_NOT_IN_CENSUS_FAMILIES",
    fsa
  );
  let res4 = await docClient.query(query4).promise();
  if (res4.Items.length >= 1) return res4.Items[0]["PROVINCE"];
};

const getProvinceFromTypeFSA = async (type, fsa) => {
  if (!type) return slowGetProvinceFromFSA(fsa);
  const query = generateDonationQueryInput(type, fsa);
  let res = await docClient.query(query).promise();
  if (res.Items.length >= 1) return res.Items[0]["PROVINCE"];
};

const getDonationSourceData = async (type, fsa) => {
  const query = generateDonationQueryInput(type, fsa);
  let res = await docClient.query(query).promise();
  if (res.Items.length >= 1) return res.Items[0];
  else throw new Error(`Could not get data for fsa ${fsa}`);
};

const getCensusSourceData = async (cid, fsa) => {
  const query = {
    TableName: censusTableName,
    Key: {
      id: `${fsa}#${cid}`,
    },
  };
  let res = await docClient.get(query).promise();
  return res.Item;
};

const queryForDonationData = async (province, type) => {
  const queryInput = {
    TableName: donationTableName,
    IndexName: "donationDataByTypeProvince",
    KeyConditionExpression: "PROVINCE = :prov and #type = :type",
    ExpressionAttributeNames: {
      "#type": "TYPE",
    },
    ExpressionAttributeValues: {
      ":prov": province,
      ":type": type,
    },
  };
  return docClient.query(queryInput).promise();
};

const queryForCensusData = async (province, cid) => {
  const queryInput = {
    TableName: censusTableName,
    IndexName: "censusDataByProvinceCID",
    KeyConditionExpression: "PROVINCE = :prov and CID = :cid",
    ExpressionAttributeValues: {
      ":prov": province,
      ":cid": cid,
    },
  };
  return docClient.query(queryInput).promise();
};

const nearestNeighbor = async (
  sourceData,
  neighborData,
  comparator,
  goalDistance
) => {
  let nearestNeighborsData = [];
  let nearestNeighborsFSAs = [];
  let nearestNeighborDistance = goalDistance;
  if (!sourceData[comparator]) {
    console.log(comparator, "is not a field in sourceData");
    return [];
  }
  for (let i = 0; i < neighborData.length; i++) {
    if (
      !neighborData[i][comparator] ||
      neighborData[i]["FSA"] === sourceData["FSA"]
    ) {
      continue;
    }
    const distance = Math.abs(
      sourceData[comparator] - neighborData[i][comparator]
    );
    if (distance < nearestNeighborDistance) {
      nearestNeighborsFSAs.push(neighborData[i]["FSA"]);
      nearestNeighborsData.push(neighborData[i]);
    }
  }
  return [nearestNeighborsData, nearestNeighborsFSAs];
};

/**
 * Currently only supports event.arguments.FSA[0], i.e. only the first FSA passed into the function will be considered.
 * @returns
 */
exports.handler = async (event) => {
  let similarDonFSAs = [];
  let similarCensusFSAs = [];
  const { FSAs, CID, TYPE, RATE_DISTANCE, FLAT_DISTANCE } = event.arguments;
  //TODO add support for multiple FSAs, maybe average the data to make a new mainFSA
  const mainFSA = FSAs[0];
  const province = await getProvinceFromTypeFSA(TYPE, mainFSA);
  // Error checking
  if (!province)
    return {
      FSAs: similarDonFSAs,
      statusCode: 404,
      error: "Could not find the province associated with the given FSA",
    };
  if (!CID && !TYPE) {
    return {
      FSAs: similarDonFSAs,
      statusCode: 400,
      error: "At least one of CID or TYPE is required for SimilarSearch",
    };
  }

  //   Do Census Nearest Neighbor using CID
  if (CID) {
    let FSAData = await queryForCensusData(province, CID);
    let sourceData = await getCensusSourceData(CID, mainFSA);
    // Gets the nearest neighbor data for the chosen CID, comparing TOTAL_PERCENT
    let [censusFSAData, censusFSAs] = await nearestNeighbor(
      sourceData,
      FSAData.Items,
      "TOTAL_PERCENT",
      RATE_DISTANCE * 100 || DEFAULT_RATE_DISTANCE * 100 // Census Data is in percentage, so multiply distance by 100
    );
    // Sort by population
    censusFSAData.sort((a, b) => b["TOTAL_COUNT"] - a["TOTAL_COUNT"]);
    similarCensusFSAs = censusFSAData.map((value) => value["FSA"]);
  }
  //   Donation Nearest Neighbor using Type
  if (TYPE) {
    let FSAData = await queryForDonationData(province, TYPE);
    let sourceData = await getDonationSourceData(TYPE, mainFSA);
    // Return the intersect of the nearest neighbors in donation rate AND median donation
    let [donRateFSAData, donRateFSAs] = await nearestNeighbor(
      sourceData,
      FSAData.Items,
      "DON_RATE",
      RATE_DISTANCE || DEFAULT_RATE_DISTANCE
    );
    console.log("SIMILAR DONATION RATES:", donRateFSAs.length);
    let [medianFSAData, medianFSAs] = await nearestNeighbor(
      sourceData,
      FSAData.Items,
      "MEDIAN_DON",
      FLAT_DISTANCE || DEFAULT_FLAT_DISTANCE
    );
    console.log("SIMILAR MEDIAN DONATIONS:", medianFSAs.length);
    medianFSAData.sort((a, b) => b["NUM_FAM"] - a["NUM_FAM"]);
    const union = new Set([...donRateFSAs, ...medianFSAs]);
    // If one set returns empty, return the other set
    if (!donRateFSAs.length || !medianFSAs.length) {
      const rVal = [...union];
      rVal.sort((a, b) => b["NUM_FAM"] - a["NUM_FAM"]);
      similarDonFSAs = rVal;
    } else {
      medianFSAData.sort((a, b) => b["NUM_FAM"] - a["NUM_FAM"]);
      const filteredArray = medianFSAs.filter((value) =>
        donRateFSAs.includes(value)
      );
      const filteredSet = new Set(filteredArray);
      let sortedIntersect = medianFSAData.filter((value) => {
        return filteredSet.has(value["FSA"]);
      });
      similarDonFSAs = sortedIntersect.map((value) => value["FSA"]);
    }
  }
  const response = {
    statusCode: 200,
    FSAs: { donation: similarDonFSAs, census: similarCensusFSAs },
    numResults: similarDonFSAs.length + similarCensusFSAs.length,
  };
  return response;
};
