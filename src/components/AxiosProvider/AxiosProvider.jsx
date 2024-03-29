import axios from "@api/axios";
import {useEffect} from "react";
import useSnackbar from "@components/SnackBarProvider/useSnackbar";

// Компонент для подписки на сервер-запросы axios с целью вывода оповещений об ошибках в снек-барах
function AxiosProvider({children}) {
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    // Подписка на запрос
    const subscriptionId = axios.interceptors.response.use(null, error => {
      if (error?.response?.status >= 500) {
        enqueueSnackbar('Ups! Server error!', 'server_error');
      }
      if (error && !error.response) {
        enqueueSnackbar('Ups! Server is not available', 'server_error')
      }
      // вызываем Promise.reject для того, чтобы прокинуть ошибку дальше по цепочке сatch - в таком случае последующие then в цепочке не вызываются  
      return Promise.reject('error handled in interceptor');
    });
    // Сброс подписки на запрос - возвращаем функцию
    return () => {
      axios.interceptors.response.eject(subscriptionId);
    }
  }, [enqueueSnackbar]);

  return children;
}

export default AxiosProvider;