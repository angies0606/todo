// @ts-nocheck
import {useMemo, useCallback} from "react";
import { useSnackbar as useNotistackSnackbar } from 'notistack';

export default function useSnackbar(message, variant) {
  const {enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar: closeNotistackSnackbar} = useNotistackSnackbar();

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