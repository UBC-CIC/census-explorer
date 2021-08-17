import DataMap from "./DataMap";
import { appStyles } from "@styles";
import Sidebar from "./sidebar/Sidebar";
import { ProvinceDataProvider } from "@context/ProvinceDataProvider";
import SidebarLoading from "./sidebar/SidebarLoading";
import DatamapLoading from "./DatamapLoading";
import { FamilyDataProvider } from "@context/family/FamilyDataProvider";
import { SelectedCategoryProvider } from "@context/appstate/SelectedDataProvider";
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
import { StandardDeviationProvider } from "@context/appstate/StandardDeviationProvider";
import { ReactNode } from "react";
import { SelectedNumericalProvider } from "@context/appstate/SelectedNumericalProvider";
import SelectedTypeProvider from "@context/appstate/SelectedTypeProvider";
import Map from "./leaflet/Map";
import { OpacityProvider } from "@context/appstate/OpacityProvider";
import { HoveredProvider } from "@context/appstate/HoveredProvider";

// ------------------------
// These Providers are used to pass data to the components
// Data is fetched, then passed to all components. These components should never update.
// ------------------------
const DataProviders = ({ children }: { children: ReactNode }) => (
  <ProvinceDataProvider>
    <FamilyDataProvider>
      <IncomeDataProvider>
        <CensusDataProvider>{children}</CensusDataProvider>
      </IncomeDataProvider>
    </FamilyDataProvider>
  </ProvinceDataProvider>
);

const App = () => {
  return (
    <div className={appStyles.App}>
      <DataProviders>
        <AppCore />
      </DataProviders>
    </div>
  );
};

// ------------------------
// Many of these providers change state, so they are rendered lower in the hierarchy
// Keep these in dependency order, but also sorted by how often they change
// ------------------------
const AppCore = () => {
  const mapLoading = useProvincesLoading();
  // const Map = mapLoading ? DatamapLoading : DataMap;
  return (
    <>
      <ThemeProvider theme={theme}>
        <SelectedProvincesProvider>
          <SelectedCategoryProvider>
            <SelectedNumericalProvider>
              <SelectedTypeProvider>
                <StandardDeviationProvider>
                  <CurrentScaleProvider>
                    <OpacityProvider>
                      <Map />
                    </OpacityProvider>
                    <Sidebar />
                  </CurrentScaleProvider>
                </StandardDeviationProvider>
              </SelectedTypeProvider>
            </SelectedNumericalProvider>
          </SelectedCategoryProvider>
        </SelectedProvincesProvider>
      </ThemeProvider>
    </>
  );
};

/** Nomenclature:
 * Outer Data Selection, ie. FAMILY, INCOME, CENSUS. -> Category
 * Middle Data Selection, ie. TotDons, NumDons, etc. -> Numerical
 * Inner Data Selection, ie. "Couples without children", "< 20k" -> Type
 */

/** Context Dependencies:
 * DataProvider passes data to rest of app
 * ThemeProvider passes theme to rest of app, doesn't change unless theme changes
 * SelectedProvincesProvider is depended on by many components, but only changes when selected province changes.
 * SelectedDataProvider passes the current outer dataset (FAMILY, INCOME, CENSUS) //TODO improve the format of data/hooks
 * Selected*TypeProvider passes the selected inner subset ("Couples without children", "< 20k", "...")
 * CurrentScaleProvider passes the current quantizeFunction according to selected provinces
 * StandardDeviationProvider changes rapidly, and is used to determine the current scale
 * HoveredProvider changes when the mouse is hovered over an FSA
 * OpacityProvider changes when the opacity slider is moved
 */

/** Data structured:
 *
 * - OUTER: Category
 *  - MIDDLE: Numerical
 *    - INNER: Type
 * Example: 
  {
   FAMILY: {
     FSA: {
       TotDons: {
         "Couple with children": 10000,
       },
     },
   },
   INCOME: {
     FSA: {
       TotDons: {
         "<20k": 1000,
       },
     },
   },
  }
 * May change when census is implemented
 */

/** The Least Changed Context should be at the top of the Component Tree.
 *
 * These include any data provider that fetches data from the server, but is never updated.
 * - ProvinceDataProvider
 * - FamilyDataProvider
 * - IncomeDataProvider
 * - CensusDataProvider
 */

export default App;
