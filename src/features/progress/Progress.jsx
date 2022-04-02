import LinearProgress from '@mui/material/LinearProgress';
import classes from './Progress.module.scss';

function Progress() {
  return (
    <LinearProgress
      className={classes.Progress__Bar}
      variant='indeterminate'
      color='warning'
    />
  )
}

export default Progress;