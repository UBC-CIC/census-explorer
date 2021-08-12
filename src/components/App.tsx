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
import { CurrentScaleProvider } from "@context/appstate/CurrentScaleProvider";

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
                  <CurrentScaleProvider>
                    <Map />
                    <Sidebar />
                  </CurrentScaleProvider>
                </SelectedFamilyTypeProvider>
              </SelectedIncomeTypeProvider>
            </SelectedDataProvider>
          </QuantizedIncomeDataProvider>
        </QuantizedFamilyDataProvider>
      </ThemeProvider>
    </>
  );
};

/** Context Dependencies:
 * SelectedProvincesProvider passes the object that represents which provinces are selected
 * <*>DataProvider passes data to rest of app
 * ThemeProvider passes theme to rest of app
 * Quantized*DataProvider (may be removed)
 * SelectedDataProvider passes the current outer dataset (FAMILY, INCOME, CENSUS)
 * Selected*TypeProvider passes the inner subset ("Couples without children", "< 20k", "...")
 * CurrentScaleProvider passes the current quantizeFunction according to selected provinces
 *
 */

/** Data structured:
 *
 * - OUTER: FAMILY, INCOME, CENSUS
 *  - INNER: [FSA]: FSAToFamilyEntry | FSAToIncomeEntry | FSAToCensusEntry @see types.ts
 *    - DATA: FamilyDataEntry | IncomeDataEntry | CensusDataEntry @see types.ts
 */
export default App;
