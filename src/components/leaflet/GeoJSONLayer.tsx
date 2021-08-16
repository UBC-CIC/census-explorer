import MapFSA from "@components/MapFSA";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useProvinceData from "@hooks/province/useProvinceData";
import { useTheme } from "@material-ui/core";
import { leafletStyles } from "@styles";
import { FSAFeatureType, PathFunctionType, TopoJSONNames } from "@types";
import projection from "@utils/projection";
import { ExtendedFeature } from "d3";
import { memo, useEffect, useState } from "react";
import { SVGOverlay, useMap, GeoJSON } from "react-leaflet";

type GeoJSONLayerProps = {
  provinceName: TopoJSONNames;
};

async function fetchVancouverJSON(zoom: number = 0): Promise<any> {
  try {
    const res = await fetch(`http://localhost:3001/api/vancouver.${zoom}`);
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
}

const GeoJSONLayer = ({ provinceName }: GeoJSONLayerProps) => {
  const theme = useTheme();
  const [geoJSON, setGeoJSON] = useState(null as any);
  const selected = useSelectedProvinces();
  const features = useProvinceData(provinceName);
  useEffect(() => {
    fetchVancouverJSON(9).then((fetchedJSON) => {
      setGeoJSON(fetchedJSON);
    });
  }, [features]);
  return (
    <>
      {features && selected[provinceName] && (
        <GeoJSON
          data={features}
          style={{
            weight: 0.5,
            fillColor: "green",
            color: theme.palette.primary.main,
          }}
        />
      )}
    </>
  );
};

export default GeoJSONLayer;
