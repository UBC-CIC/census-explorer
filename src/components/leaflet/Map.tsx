import ColorLegend from "@components/colorLegend/ColorLegend";
import OpacitySlider from "@components/OpacitySlider";
import Selection from "@components/selection/Selection";
import Spinner from "@components/Spinner";
import useProvincesLoading from "@hooks/province/useProvincesLoading";
import { TopoJSONNames } from "@types";
import { LatLngTuple } from "leaflet";
import { LayerGroup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet-area-select";
import AreaSelect from "./AreaSelect";
import GeoJSONLayer from "./GeoJSONLayer";
import Search from "@components/search/Search";
import _ from "lodash";
import React, { MouseEvent, useEffect, useState } from "react";
import useHoveredData from "@hooks/appstate/useHoveredData";

type MapProps = {};

const UBC_LAT_LNG: LatLngTuple = [49.2606, -123.246];
const CANADA_LAT_LNG: LatLngTuple = [56.1304, -106.3468];
const Map = (props: MapProps) => {
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as any);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
    };
  }, []);
  let loading = useProvincesLoading();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const hoveredData = useHoveredData();

  if (loading) {
    return <Spinner />;
  }
  const handleMouseMove = _.throttle((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY - 40 });
  }, 100);
  return (
    <>
      {!!hoveredData.fsa && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: 10000,
            top: mousePos.y,
            left: mousePos.x,
            backgroundColor: "white",
            borderRadius: "5px",
            padding: 5,
          }}
        >
          {hoveredData.fsa}
        </div>
      )}
      <MapContainer center={CANADA_LAT_LNG} zoom={3} maxZoom={12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          {Object.keys(TopoJSONNames).map((province) => (
            <GeoJSONLayer
              key={province}
              provinceName={province as TopoJSONNames}
            />
          ))}
        </LayerGroup>
        <ColorLegend />
        <OpacitySlider />
        <Selection />
        <AreaSelect />
      </MapContainer>
    </>
  );
};

export default Map;
