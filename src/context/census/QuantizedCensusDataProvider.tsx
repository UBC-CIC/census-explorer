// import useCensusData from "@hooks/census/useCensusData";
// import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
// import {
//   FamilyTypeOption,
//   FSAToCensus,
//   FSAToFamilyEntry,
//   FSAType,
//   NumericalFamilyKey,
// } from "@types";
// import { createQuantizeFunction } from "@utils/createFamilyQuantizeFunction";
// import React, { ReactNode } from "react";

// type QuantizedDataContextType = {
//   data: FSAToCensus;
// };

// const QuantizedDataCensusContext = React.createContext(
//   {} as QuantizedDataContextType
// );

// type QuantizeFunctions = {
//   [famType in FamilyTypeOption]?: {
//     [numType in NumericalFamilyKey]?: (value: any) => any;
//   };
// };

// export const QuantizedCensusDataProvider = (props: {
//   children?: ReactNode;
// }) => {
//   const { children } = props;
//   const loading = useCensusDataLoading();
//   const data = useCensusData();
//   if (loading) return <>{children}</>;

//   const quantizeFunctions: QuantizeFunctions = {
//     [FamilyTypeOption.COUPLE_WITHOUT_CHILDREN]: {},
//     [FamilyTypeOption.COUPLE_WITH_CHILDREN]: {},
//     [FamilyTypeOption.LONE_PARENT_FAMILIES]: {},
//     [FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES]: {},
//   };

//   for (const famType of Object.values(FamilyTypeOption)) {
//     quantizeFunctions[famType] = {};
//     for (const numType of Object.values(NumericalFamilyKey)) {
//       quantizeFunctions[famType]![numType] = createQuantizeFunction(
//         data,
//         famType,
//         numType
//       );
//     }
//   }

//   const retData: FamilyTypeToFSAColorMap = {};

//   for (const entry of Object.entries(data)) {
//     const [typedKey, value] = entry as [FSAType, FSAToFamilyEntry];
//     retData[typedKey] = {
//       [FamilyTypeOption.COUPLE_WITHOUT_CHILDREN]: {},
//       [FamilyTypeOption.COUPLE_WITH_CHILDREN]: {},
//       [FamilyTypeOption.LONE_PARENT_FAMILIES]: {},
//       [FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES]: {},
//     };
//     for (const famType of Object.values(FamilyTypeOption)) {
//       for (const numType of Object.values(NumericalFamilyKey)) {
//         retData![typedKey]![famType]![numType] = quantizeFunctions![famType]![
//           numType
//         ]!(value[famType][numType]);
//       }
//     }
//   }

//   console.log(retData);

//   return (
//     <QuantizedDataCensusContext.Provider value={{ data: retData }}>
//       {children}
//     </QuantizedDataCensusContext.Provider>
//   );
// };

// export default QuantizedDataCensusContext;
export default null;
