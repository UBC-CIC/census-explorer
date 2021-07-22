import DataMap from "./DataMap";
import { appStyles } from "@styles";
import { SelectedProvincesProvider } from "@context/SelectedProvincesContext";
import Sidebar from "./sidebar/Sidebar";
function App() {
  return (
    <div className={appStyles.App}>
      <SelectedProvincesProvider>
        <DataMap />
        <Sidebar />
      </SelectedProvincesProvider>
    </div>
  );
}

export default App;
