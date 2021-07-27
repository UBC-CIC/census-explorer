import { spinnerStyles } from "@styles";

type SpinnerProps = {};

const Spinner = (props: SpinnerProps) => {
  return (
    <div className={`fa-3x ${spinnerStyles.container}`}>
      <i className={`fas fa-spinner fa-pulse ${spinnerStyles.spinner}`} />
    </div>
  );
};

export default Spinner;
