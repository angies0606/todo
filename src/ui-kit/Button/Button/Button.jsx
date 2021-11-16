import classes from './Button.module.scss';
import React from 'react';


class Button extends React.Component {
  render() {
    return (
      <>
        <button
          className={classes.Button}
          // onMouseEnter={this.onMouseEnter}
          // onMouseLeave={this.onMouseLeave}
          onClick={() => this.props.onClick()}
        >
        <this.props.icon size={30} />
        </button>
      </>
    )
  }

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