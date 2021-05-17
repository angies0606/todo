import classes from './AddTodoListButton.module.scss';
import {Plus} from 'react-bootstrap-icons';
import React from 'react';
import AddTodoListDialog from '@dialogs/AddTodoListDialog/AddTodoListDialog';

class AddTodoListButton extends React.Component {

  state = {
    hover: false,
    isAddTodoListDialogVisible: false
  };

  render() {
    return (
      <>
        <button
          className={classes.AddTodoListButton}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onMouseClick}
        >
          <Plus
            className={classes.AddTodoListButton__icon}
            size={35}
            color={this.state.hover ? 'white' : 'coral'}
          />
        </button>

        <AddTodoListDialog
          show={this.state.isAddTodoListDialogVisible}
          onClose={this.onAddTodoListDialogClose}
          onConfirm={this.addTodoList}
        />
      </>
    )
  }

  onAddTodoListDialogClose = () => {
    this.setState({
      isAddTodoListDialogVisible: false
    });
  }

  onMouseClick = () => {
    this.setState({
      isAddTodoListDialogVisible: true
    });
  }

  onMouseEnter = () => {
    this.setState({
      hover: true
    });
  }

  onMouseLeave = () => {
    this.setState({
      hover: false
    });
  }

  addTodoList = (data) => {
    this.onAddTodoListDialogClose();
    this.props.addTodoList(data);
  }
}

export default AddTodoListButton;