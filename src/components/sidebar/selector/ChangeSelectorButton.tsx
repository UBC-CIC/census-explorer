import Spinner from "@components/Spinner";
import useProvincesLoading from "@hooks/province/useProvincesLoading";
import strings from "@l10n/strings";
import { Button, makeStyles } from "@material-ui/core";
import { SelectorShown } from "@types";
type ChangeSelectorButtonProps = {
  shown: SelectorShown;
  toggleShown: () => void;
  flat?: boolean;
};

const useStyles = makeStyles({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
const ChangeSelectorButton = ({
  shown,
  toggleShown,
  flat,
}: ChangeSelectorButtonProps) => {
  const loading = useProvincesLoading();
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleShown()}
        className={flat ? classes.button : ""}
        disabled={loading}
        endIcon={loading ? <Spinner /> : null}
      >
        {shown === SelectorShown.CHECKBOX
          ? strings.toggleToMap
          : strings.toggleToCheckbox}
      </Button>
    </div>
  );
};

export default ChangeSelectorButton;
