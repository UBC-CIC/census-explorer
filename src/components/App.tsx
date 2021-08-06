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
import useLoading from "@hooks/appstate/useLoading";
import { SelectedProvincesProvider } from "@context/appstate/SelectedProvincesContext";
import { SelectedFamilyTypeProvider } from "@context/appstate/SelectedFamilyTypeProvider";
import { QuantizedFamilyDataProvider } from "@context/family/QuantizedFamilyDataProvider";
import { IncomeDataProvider } from "@context/income/IncomeDataProvider";
import { QuantizedIncomeDataProvider } from "@context/income/QuantizedIncomeDataProvider";
import { SelectedIncomeTypeProvider } from "@context/appstate/SelectedIncomeTypeProvider";

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
              {/* <CensusDataProvider> */}
              <AppCore />
              {/* </CensusDataProvider> */}
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
  const loading = useLoading();
  if (loading) {
    return (
      <>
        <DatamapLoading />
        <SidebarLoading />
      </>
    );
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <SelectedDataProvider>
          <SelectedFamilyTypeProvider>
            <SelectedIncomeTypeProvider>
              <QuantizedFamilyDataProvider>
                <QuantizedIncomeDataProvider>
                  <DataMap />
                  <Sidebar />
                </QuantizedIncomeDataProvider>
              </QuantizedFamilyDataProvider>
            </SelectedIncomeTypeProvider>
          </SelectedFamilyTypeProvider>
        </SelectedDataProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
