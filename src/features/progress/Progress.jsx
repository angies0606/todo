import classes from "./Progress.module.scss";
import LinearProgress from "@mui/material/LinearProgress";

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