import DataMap from "./DataMap";
import { appStyles } from "@styles";
import Sidebar from "./sidebar/Sidebar";
import { ProvinceDataProvider } from "@context/ProvinceDataProvider";
import SidebarLoading from "./sidebar/SidebarLoading";
import DatamapLoading from "./DatamapLoading";
import { FamilyDataProvider } from "@context/family/FamilyDataProvider";
import { SelectedDataProvider } from "@context/appstate/SelectedDataProvider";
import { CensusDataProvider } from "@context/census/CensusDataProvider";
import { ThemeProvider } from "@material-ui/core";
import theme from "@constants/theme";
import { SelectedProvincesProvider } from "@context/appstate/SelectedProvincesContext";
import { SelectedFamilyTypeProvider } from "@context/appstate/SelectedFamilyTypeProvider";
import { QuantizedFamilyDataProvider } from "@context/family/QuantizedFamilyDataProvider";
import { IncomeDataProvider } from "@context/income/IncomeDataProvider";
import { QuantizedIncomeDataProvider } from "@context/income/QuantizedIncomeDataProvider";
import { SelectedIncomeTypeProvider } from "@context/appstate/SelectedIncomeTypeProvider";
import useProvincesLoading from "@hooks/province/useProvincesLoading";

// ------------------------
// These Providers are used to pass data to the components
// ------------------------
const App = () => {
  return (
    <div className={appStyles.App}>
      <SelectedProvincesProvider>
        <ProvinceDataProvider>
          <FamilyDataProvider>
            <IncomeDataProvider>
              <CensusDataProvider>
                <AppCore />
              </CensusDataProvider>
            </IncomeDataProvider>
          </FamilyDataProvider>
        </ProvinceDataProvider>
      </SelectedProvincesProvider>
    </div>
  );
};

// ------------------------
// Quantized Providers are passed here because
// they require the data from the above providers
// ------------------------

const AppCore = () => {
  const mapLoading = useProvincesLoading();
  const Map = mapLoading ? DatamapLoading : DataMap;
  return (
    <>
      <ThemeProvider theme={theme}>
        <QuantizedFamilyDataProvider>
          <QuantizedIncomeDataProvider>
            <SelectedDataProvider>
              <SelectedIncomeTypeProvider>
                <SelectedFamilyTypeProvider>
                  <Map />
                  <Sidebar />
                </SelectedFamilyTypeProvider>
              </SelectedIncomeTypeProvider>
            </SelectedDataProvider>
          </QuantizedIncomeDataProvider>
        </QuantizedFamilyDataProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
