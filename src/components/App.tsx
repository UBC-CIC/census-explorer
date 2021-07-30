import DataMap from "./DataMap";
import { appStyles } from "@styles";
import { SelectedProvincesProvider } from "@context/SelectedProvincesContext";
import Sidebar from "./sidebar/Sidebar";
import { ProvinceDataProvider } from "@context/ProvinceDataProvider";
import useProvincesLoading from "@hooks/province/useProvincesLoading";
import SidebarLoading from "./sidebar/SidebarLoading";
import DatamapLoading from "./DatamapLoading";
import { FamilyDataProvider } from "@context/FamilyDataProvider";
import { SelectedDataProvider } from "@context/SelectedDataProvider";
import { QuantizedFamilyDataProvider } from "@context/QuantizedFamilyDataProvider";
import { CensusDataProvider } from "@context/CensusDataProvider";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import { SelectedFamilyTypeProvider } from "@context/SelectedFamilyTypeProvider";
import { ThemeProvider } from "@material-ui/core";
import theme from "@constants/theme";
const App = () => {
  return (
    <div className={appStyles.App}>
      <SelectedProvincesProvider>
        <ProvinceDataProvider>
          <FamilyDataProvider>
            <CensusDataProvider>
              <SelectedDataProvider>
                <SelectedFamilyTypeProvider>
                  <AppCore />
                </SelectedFamilyTypeProvider>
              </SelectedDataProvider>
            </CensusDataProvider>
          </FamilyDataProvider>
        </ProvinceDataProvider>
      </SelectedProvincesProvider>
    </div>
  );
};

const AppCore = () => {
  const provincesLoading = useProvincesLoading();
  const familyLoading = useFamilyDataLoading();
  const loading = provincesLoading || familyLoading;
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
        <QuantizedFamilyDataProvider>
          <DataMap />
          <Sidebar />
        </QuantizedFamilyDataProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
