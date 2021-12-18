import {SnackbarProvider as NotistackSnackbarProvider} from 'notistack';
import {SnackbarContentWithRef} from './SnackbarContent';

// @ts-ignore
// const useStyles = makeStyles(theme => ({
//   success: { backgroundColor: 'purple !important' },
//   error: { backgroundColor: 'blue' },
//   warning: { backgroundColor: 'green' },
//   info: { backgroundColor: 'yellow' },
// }));


function SnackbarProvider ({children}) {
  // const classes = useStyles();
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      // classes={{
      //   variantSuccess: classes.success,
      //   variantError: classes.error,
      //   variantWarning: classes.warning,
      //   variantInfo: classes.info
      // }}
      content={(key, data) => {
        return <SnackbarContentWithRef id={key} data={data} />;
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}

export default SnackbarProvider;