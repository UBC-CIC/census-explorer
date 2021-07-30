import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
import useProvincesLoading from "@hooks/province/useProvincesLoading";

const useLoading = () => {
  const provincesLoading = useProvincesLoading();
  const familyLoading = useFamilyDataLoading();
  const censusLoading = useCensusDataLoading();
  const incomeLoading = useIncomeDataLoading();
  const loading =
    provincesLoading || familyLoading || censusLoading || incomeLoading;
  return loading;
};

export default useLoading;
