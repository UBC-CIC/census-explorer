import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngBoundsExpression, Map } from "leaflet";
import { FSAType } from "@types";
import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import * as d3 from "d3";
import { bboxPolygon, intersect, lineString, lineToPolygon } from "@turf/turf";

export type CustomMap = Map & {
  selectArea?: {
    enable: () => void;
    disable: () => void;
    setValidate: (validate?: (e: L.PointExpression) => boolean) => void;
  };
};
export default function AreaSelect() {
  const map = useMap() as CustomMap;
  const { setSelection } = useContext(FSASelectionContext);
  useEffect(() => {
    if (!map.selectArea) return;
    map.selectArea.enable();
    map.on("areaselected", (e: any) => {
      const newSelectedSet = new Set<FSAType>();
      //  Generate a Feature from the bounds of the selection
      const b = e.bounds;
      const box = bboxPolygon([
        b._southWest.lng,
        b._southWest.lat,
        b._northEast.lng,
        b._northEast.lat,
      ]);

      console.time("Select");

      map.eachLayer((layer: any) => {
        if (
          layer._bounds &&
          layer._bounds._northEast &&
          layer._bounds._southWest
        ) {
          if (!e.bounds.intersects(layer._bounds)) return;

          if (intersect(box, layer.feature)) {
            newSelectedSet.add(layer.feature.properties.CFSAUID);
          }
        }
      });

      setSelection((old) => {
        return new Set([...old, ...newSelectedSet]);
      });
      console.timeEnd("Select");
    });

    return () => {
      map.removeEventListener("areaselected");
    };
  }, [map]);

  return null;
}
