import classes from "./Button.module.scss";
import classNames from "classnames";
import Tooltip from "@ui-kit/Tooltip/Tooltip";

function Button ({
  onClick,
  tooltipTitle = '',
  children,
  className = ''
}) {
  const isTooltipEnabled = Boolean(tooltipTitle);

  return (
    <Tooltip
      title={tooltipTitle}
      disableFocusListener={!isTooltipEnabled}
      disableHoverListener={!isTooltipEnabled}
      disableTouchListener={!isTooltipEnabled}
      enterDelay={500} 
    >
      <button
        className={classNames(classes.Button, className)}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </Tooltip>
  )
}

export default Button;