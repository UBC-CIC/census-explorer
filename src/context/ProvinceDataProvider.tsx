import { CanadaTopologyType, ProvinceOption, TopoJSONNames } from "@types";
import {
  ExtendedFeature,
  ExtendedFeatureCollection,
  GeoGeometryObjects,
} from "d3";
import React, { ReactNode, useEffect, useState } from "react";
import * as topojson from "topojson-client";

const provinceNames: (keyof typeof TopoJSONNames)[] = [
  "ab",
  "bc",
  "mb",
  "nb",
  "nl",
  "ns",
  "nt",
  "nu",
  "on",
  "pe",
  "qc",
  "sk",
  "yt",
];

export type ProvinceDataOptions = { [province in keyof ProvinceOption]: any };

type DataContextType = {
  outlines: ProvinceDataOptions;
  provinces: ProvinceDataOptions;
  fsaSets: { [province in keyof ProvinceOption]: Set<string> };
  loading: boolean;
};

const ProvinceDataContext = React.createContext({} as DataContextType);
// New Set for each Province
const provinceFSASets = {
  ab: new Set<any>(),
  bc: new Set<any>(),
  mb: new Set<any>(),
  nb: new Set<any>(),
  nl: new Set<any>(),
  ns: new Set<any>(),
  nt: new Set<any>(),
  nu: new Set<any>(),
  on: new Set<any>(),
  pe: new Set<any>(),
  qc: new Set<any>(),
  sk: new Set<any>(),
  yt: new Set<any>(),
};

const populateFSASets = (
  provinceName: keyof ProvinceOption,
  features: ExtendedFeature<
    GeoGeometryObjects | null,
    GeoJSON.GeoJsonProperties
  >[]
) => {
  features.forEach((feature) => {
    if (!feature.properties?.CFSAUID) console.log("Could not find FSA");
    provinceFSASets[provinceName].add(feature.properties!.CFSAUID);
  });
};
const fetchFSAData = async (provinceName: string) => {
  const res = await fetch(`/api/${provinceName}`);
  const provinceTopo = (await res.json()) as unknown as CanadaTopologyType;
  const properties = provinceTopo.objects[provinceName];
  const features = (
    topojson.feature(provinceTopo, properties) as ExtendedFeatureCollection
  ).features;
  populateFSASets(provinceName as keyof ProvinceOption, features);
  return features;
};

// TODO cache fetched files in browser / service worker
const fetchOutlineData = async (provinceName: string) => {
  const nameWithOutline = `${provinceName}-outline`;
  const res = await fetch(`/api/${nameWithOutline}`);
  const provinceTopo = (await res.json()) as unknown as CanadaTopologyType;
  const properties = provinceTopo.objects[nameWithOutline];

  const features = (
    topojson.feature(provinceTopo, properties) as ExtendedFeatureCollection
  ).features;

  return features;
};

export const ProvinceDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [data, setData] = useState({
    loading: true,
  } as DataContextType);

  // Fetch all province topoJSON data
  useEffect(() => {
    const fetchAllData = async () => {
      const provincePromise = Promise.all(
        Object.keys(TopoJSONNames).map((provinceName) =>
          fetchFSAData(provinceName)
        )
      );
      const outlinePromise = Promise.all(
        Object.keys(TopoJSONNames).map((provinceName) =>
          fetchOutlineData(provinceName)
        )
      );

      const fetchedProvinces = await provincePromise;
      const fetchedOutlines = await outlinePromise;

      try {
        const formattedProvinces = fetchedProvinces.reduce(
          (prev, curr, index) => {
            return {
              ...prev,
              [provinceNames[index]]: curr,
            };
          },
          {} as ProvinceDataOptions
        );
        const formattedOutlines = fetchedOutlines.reduce(
          (prev, curr, index) => {
            return {
              ...prev,
              [provinceNames[index]]: curr,
            };
          },
          {} as ProvinceDataOptions
        );
        setData({
          loading: false,
          provinces: formattedProvinces,
          outlines: formattedOutlines,
          fsaSets: provinceFSASets,
        });
      } catch (e) {
        console.log(e);
        setData((old) => ({ ...old, loading: false }));
      }
    };
    if (data.loading) fetchAllData();
  }, []);

  return (
    <ProvinceDataContext.Provider value={{ ...data }}>
      {children}
    </ProvinceDataContext.Provider>
  );
};

export default ProvinceDataContext;
