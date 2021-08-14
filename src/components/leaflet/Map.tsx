import ProvincePath from "@components/provinces/ProvincePath";
import Spinner from "@components/Spinner";
import useProvincesLoading from "@hooks/province/useProvincesLoading";
import { TopoJSONNames } from "@types";
import { LatLngTuple } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
} from "react-leaflet";
import GeoJSONLayer from "./GeoJSONLayer";

type MapProps = {};

const VANCOUVER_LAT_LNG: LatLngTuple = [49.28, -123.12];
const CANADA_LAT_LNG: LatLngTuple = [56.1304, -106.3468];
const Map = (props: MapProps) => {
  let loading = useProvincesLoading();
  if (loading) {
    return <Spinner />;
  }
  let BC = () => <GeoJSONLayer provinceName={TopoJSONNames.bc} />;
  return (
    <MapContainer center={VANCOUVER_LAT_LNG} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={VANCOUVER_LAT_LNG}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <BC />
    </MapContainer>
  );
};

export default Map;
