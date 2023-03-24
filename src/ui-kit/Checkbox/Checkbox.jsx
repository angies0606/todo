import classes from "./Checkbox.module.scss";
import classNames from "classnames";
import { CheckSquare, Square } from "react-bootstrap-icons";

function Checkbox ({
  value,
  onChange,
  size, 
  isDisabled
}) {

 const onClick = () => {
    if(isDisabled) return;
    const newValue = !value
    onChange && onChange(newValue);
  }

  return (
    <span
      className={classNames(classes.Checkbox, {
        [classes['Checkbox--disabled']]: isDisabled
      })}
      onClick={onClick}
    >
      {value
        ? <CheckSquare size={size} className={classes.Checkbox__CheckSquare} />
        : <Square size={size} />
      }
    </span>
  );
}

export default Checkbox;