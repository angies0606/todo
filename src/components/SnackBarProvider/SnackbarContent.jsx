import classes from "./SnackbarContent.module.scss";
import { forwardRef } from "react";
import useSnackbar from "./useSnackbar.js";
import { SnackbarContent as NotistackSnackbarContent } from "notistack";
import Button from "@ui-kit/Button/Button/Button";
import { X, ShieldFillCheck, EmojiFrownFill, HddFill, WifiOff } from "react-bootstrap-icons";

const SnackbarContent = ({id, data}, ref) => {
  const {closeSnackbar} = useSnackbar();
  
  const close = () => {
    closeSnackbar(id)
  }

  const SnackbarVariantClass = () => {
    switch (data?.variant) {
      case 'success': 
        return classes.SnackbarSuccess;
      case 'error':
        return classes.SnackbarError;
      case 'server_error':
        return classes.SnackbarServerError;
      case 'internet_error':
        return classes.SnackbarInternetError;
      default: 
        return;
    }
  }

  const IconVariant = () => {
    switch (data?.variant) {
      case 'success': 
        return ShieldFillCheck;
      case 'error':
        return EmojiFrownFill;
      case 'server_error':
        return HddFill;
      case 'internet_error':
        return WifiOff;
      default: 
        return;
    } 
  }
  
  const CurrentIconVariant = IconVariant();

  return (
    <NotistackSnackbarContent ref={ref} onClick={close}>
      <div className={`${classes.SnackbarContent} ${SnackbarVariantClass()}`}>
        <div className={classes.SnackbarContent__IconBox}>
          {
            CurrentIconVariant &&
            <CurrentIconVariant size={20} className={classes.SnackbarContent__VariantIcon} />
          }
        </div>
        <div className={classes.SnackbarContent__MessageBlock}>
          <span className={classes.SnackbarContent__Message}>{data.message}</span>
        </div>

        <Button
          onClick={close}
          className={classes.SnackbarContent__CloseButton}
        >
          <X size={20} className={classes.SnackbarContent__CloseButtonIcon} />
        </Button>
      </div>
    </NotistackSnackbarContent>
  )
}

export const SnackbarContentWithRef = forwardRef(SnackbarContent);