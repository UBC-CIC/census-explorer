import { Objects, Properties, Topology } from "types";
import canadaTopoJson from "./canada.json";

// const canadaTopo = canadaTopoJson as unknown as TopoJSON.Topology & {
//   properties: { CFSAUID: string; PRUID: string; PRNAME: string };
// };

const canadaTopo = canadaTopoJson as unknown as TopoJSON.Topology<
  TopoJSON.Objects<Properties>
>;
export { canadaTopo };
