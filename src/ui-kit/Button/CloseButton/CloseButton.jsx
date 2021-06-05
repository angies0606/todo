import classes from './CloseButton.module.scss';
import {XCircle} from 'react-bootstrap-icons';
import React from 'react';


class CloseButton extends React.Component {
  render() {
    return (
      <>
        <button
          className={classes.CloseButton}
          // onMouseEnter={this.onMouseEnter}
          // onMouseLeave={this.onMouseLeave}
          onClick={() => this.props.onClick()}
        >
          <XCircle
            className={classes.CloseButton__icon}
            size={30}
          />
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

export default CloseButton;