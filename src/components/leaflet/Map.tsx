import ColorLegend from "@components/colorLegend/ColorLegend";
import OpacitySlider from "@components/OpacitySlider";
import Spinner from "@components/Spinner";
import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import HoveredContext from "@context/appstate/HoveredProvider";
import useProvincesLoading from "@hooks/province/useProvincesLoading";
import { FSAType, TopoJSONNames } from "@types";
import { LatLngTuple } from "leaflet";
import { useContext, useEffect, useState } from "react";
import { LayerGroup, MapContainer, TileLayer } from "react-leaflet";
import GeoJSONLayer from "./GeoJSONLayer";

type MapProps = {};

const UBC_LAT_LNG: LatLngTuple = [49.2606, -123.246];
const CANADA_LAT_LNG: LatLngTuple = [56.1304, -106.3468];
const Map = (props: MapProps) => {
  let loading = useProvincesLoading();
  const { setHovered } = useContext(HoveredContext);
  const { setSelection } = useContext(FSASelectionContext);

  const [hoveredInner, setHoveredInner] = useState<FSAType | undefined>(
    undefined
  );
  const [selectedInner, setSelectedInner] = useState<Set<FSAType>>(new Set());

  useEffect(() => {
    setHovered(hoveredInner);
  }, [hoveredInner, setHovered]);

  useEffect(() => {
    setSelection(selectedInner);
  }, [selectedInner, setSelection]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <MapContainer center={UBC_LAT_LNG} zoom={9} maxZoom={12}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerGroup>
        {Object.keys(TopoJSONNames).map((province) => (
          <GeoJSONLayer
            toggleSelected={setSelectedInner}
            setHovered={setHoveredInner}
            key={province}
            provinceName={province as TopoJSONNames}
          />
        ))}
      </LayerGroup>

      <ColorLegend />
      <OpacitySlider />
    </MapContainer>
  );
};

export default Map;
