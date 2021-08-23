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

type MapProps = {};

const UBC_LAT_LNG: LatLngTuple = [49.2606, -123.246];
const CANADA_LAT_LNG: LatLngTuple = [56.1304, -106.3468];
const Map = (props: MapProps) => {
  let loading = useProvincesLoading();

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <MapContainer center={UBC_LAT_LNG} zoom={9} maxZoom={12}>
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
