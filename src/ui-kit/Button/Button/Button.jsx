import classes from './Button.module.scss';
import Tooltip from '@ui-kit/Tooltip/Tooltip';
import classNames from 'classnames';

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
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
        onClick={() => onClick()}
      >
        {children}
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