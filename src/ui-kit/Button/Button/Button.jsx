import classes from './Button.module.scss';
import Tooltip from '@ui-kit/Tooltip/Tooltip';

function Button ({
  onClick,
  Icon,
  tooltipTitle = ''
}) {
  const isTooltipEnabled = Boolean(tooltipTitle);

  return (
    <Tooltip
      title={tooltipTitle}
      disableFocusListener={!isTooltipEnabled}
      disableHoverListener={!isTooltipEnabled}
      disableTouchListener={!isTooltipEnabled}
    >
      <button
        className={classes.Button}
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
        onClick={() => onClick()}
      >
        <Icon size={30} />
      </button>
    </Tooltip>
  )
  

  // onAddTodoListDialogClose = () => {
  //   this.setState({
  //     isAddTodoListDialogVisible: false
  //   });
  // }

  // onMouseClick = () => {
  //   this.props.isClicked();
  // }

  // onMouseEnter = () => {
  //   this.setState({
  //     hover: true
  //   });
  // }

  // onMouseLeave = () => {
  //   this.setState({
  //     hover: false
  //   });
  // }
}

export default Button;