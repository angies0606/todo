import classes from './Button.module.scss';
import React from 'react';


function Button ({
  onClick,
  Icon
}) {

  return (
    <>
      <button
        className={classes.Button}
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
        onClick={() => onClick()}
      >
      <Icon size={30} />
      </button>
    </>
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