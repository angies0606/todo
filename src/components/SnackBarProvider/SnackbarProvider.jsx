// @ts-ignore
import {SnackbarContentWithRef} from "./SnackbarContent";
import {SnackbarProvider as NotistackSnackbarProvider} from "notistack";

const AUTO_HIDE_DURATION = 5000

function SnackbarProvider ({children}) {
  return (
    <NotistackSnackbarProvider
      autoHideDuration={AUTO_HIDE_DURATION}
      maxSnack={3}
      content={(key, data) => {
        return <SnackbarContentWithRef id={key} data={data} />;
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}

export default SnackbarProvider;