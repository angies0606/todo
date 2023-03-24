import classes from "./NoData.module.scss";
import classNames from "classnames";
import { FileTextFill } from "react-bootstrap-icons";

function NoData ({
  className,
  message,
  imageStyle
}) {
  return (
    <>
      <div className={classNames(classes.NoData__Box, className)}>
        <FileTextFill style={imageStyle}/>
        <span className={classes.NoData__Message}>{message}</span>
      </div>
    </>
  )
}

export default NoData;