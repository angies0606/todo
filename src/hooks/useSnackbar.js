// @ts-nocheck
import {useState, Fragment, useRef, useMemo, useCallback} from 'react';
import Button from '@mui/material/Button';
import MUISnackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { useSnackbar as useNotistackSnackbar } from 'notistack';


// const styles = {
//   success: { backgroundColor: 'purple' },
//   error: { backgroundColor: 'blue' },
//   warning: { backgroundColor: 'green' },
//   info: { backgroundColor: 'yellow' },
// };

// const notistackRef = createRef();
// const onClickClose = key => () => { 
//     notistackRef.current.closeSnackbar(key);
// }

export default function useSnackbar(message, variant) {
  const {enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar: closeNotistackSnackbar} = useNotistackSnackbar();

  // const enqueueSnackbar = useMemo(() => {
  //   return (message, variant) => {
  //     return enqueueNotistackSnackbar({
  //       message,
  //       variant
  //     },
  //     {
  //       autoHideDuration: null
  //     })
  //   }
  // }, [enqueueNotistackSnackbar]);
 
  // Мемоизация моей функции-обертки enqueueSnackbar для предотвращения пересоздания при перерендере компонентов, 
  // которые используют хук useSnackbar.
  const enqueueSnackbar = useCallback((message, variant) => {
    return enqueueNotistackSnackbar({
      message,
      variant
    });
  }, [enqueueNotistackSnackbar])

  // Мемоизация моей функции-обертки closeSnackbar, для предотвращения пересоздания при перерендере компонентов, 
  // которые используют хук useSnackbar.
  const closeSnackbar = useCallback((key) => {
    return closeNotistackSnackbar(key);
  }, [closeNotistackSnackbar]);

  const state = useMemo(() => {
    return {
      enqueueSnackbar,
      closeSnackbar
    };
  }, [enqueueSnackbar, closeSnackbar]);

  return state;
}