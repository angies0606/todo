import ProgressProvider from "@features/progress/ProgressProvider";
import SnackbarProvider from "../SnackBarProvider/SnackbarProvider";
import AxiosProvider from "@components/AxiosProvider/AxiosProvider";
import TodoListDialogProvider from "@dialogs/TodoListDialog/TodoListDialogProvider.connected";

export function AppProviders({children}) {
  return (
    <>
      <SnackbarProvider>
      <AxiosProvider>
      <ProgressProvider>
      <TodoListDialogProvider>
        {children}
      </TodoListDialogProvider>
      </ProgressProvider>
      </AxiosProvider>
      </SnackbarProvider>
    </>
  )
}

export default AppProviders;