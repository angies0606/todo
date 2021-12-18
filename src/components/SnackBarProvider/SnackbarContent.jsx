import classes from './SnackbarContent.module.scss';
import { SnackbarContent as NotistackSnackbarContent } from 'notistack';
import { forwardRef } from 'react';
import Button from '@ui-kit/Button/Button/Button';
import {X, ShieldFillCheck, EmojiFrownFill, HddFill, WifiOff} from 'react-bootstrap-icons';
import { useSnackbar} from 'notistack';

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
        <span className={classes.SnackbarContent__MessageBlock}>
        {
          CurrentIconVariant &&
          <CurrentIconVariant size={20} className={classes.SnackbarContent__VariantIcon} />
        }
          {/* {data.variant === 'success'
            ? <ShieldFillCheck size={20} className={classes.SnackbarContent__VariantIcon}/>
            : data.variant === 'error'
              ? <EmojiFrownFill size={20} className={classes.SnackbarContent__VariantIcon} />
            : null
          } */}

        {data.message}
        </span>

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


