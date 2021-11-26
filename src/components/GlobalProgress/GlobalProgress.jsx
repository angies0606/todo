import {useProgressContext} from '@contexts/progress.context';
import LinearProgress from '@mui/material/LinearProgress';
import classes from './GlobalProgress.module.scss';

function GlobalProgress() {
  const {isProgress} = useProgressContext()

  return (
    <>
      {
        isProgress &&
        <LinearProgress
          className={classes.GlobalProgress__Bar}
          variant='indeterminate'
          color='primary'
        />
      }
    </>
  )
}

export default GlobalProgress;