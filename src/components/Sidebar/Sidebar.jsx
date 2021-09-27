import { Link, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {ThreeDotsVertical} from 'react-bootstrap-icons';
import classes from './Sidebar.module.scss';
import Dropdown from '@ui-kit/Dropdown/Dropdown';
import React from 'react';
import TodoListDialog from '@dialogs/TodoListDialog/TodoListDialog';


class Sidebar extends React.Component {

  state = {
    editedTodoList: null
  };

  render() {
    return (
      <>
        <Nav defaultActiveKey="/home" className={this.props.className + ' flex-column bg-light'}>
          {
            this.props.todoLists.map(todoList =>
              <Nav.Link
                key={todoList.id}
                className={classes.NavLink}
                as='span'
              >
                <Link to={`/todo-list/${todoList.id}`}>
                  {todoList.title}
                </Link>
                <Dropdown
                  icon={ThreeDotsVertical} 
                  items={[
                    {
                      title: 'Delete',
                      onClick: () => this.deleteTodoList(todoList)
                    },
                    {
                      title: 'Edit',
                      onClick: () => this.editTodoList(todoList)
                    },
                  ]}
                />
              </Nav.Link>
            )
          }
        </Nav>
        {this.props.todoLists.map(todoList =>
        <TodoListDialog
          show={Boolean(this.state.editedTodoList)}
          onClose={this.onEditTodoListDialogClose}
          onConfirm={data => this.editConfirmed(data, todoList.id)}
          title={'Edit list'}
          confirmText={'Edit'}
          todoList={this.state.editedTodoList}
        />
        )}
      </>
    )
  }

  deleteTodoList = todoList => {
    // // попробовать сделать это через react redux router
    // // https://github.com/supasate/connected-react-router
    // if (this.props.history.location.pathname === `/todo-list/${todoList.id}`) {
    //   this.props.history.push('/');
    // }
    this.props.deleteTodoList(todoList.id);
  }

  editTodoList = todoList => {
    this.setState({
      ...this.state,
      editedTodoList: todoList
    });
  }

  onEditTodoListDialogClose = () => {
    this.setState({
      ...this.state,
      editedTodoList: null
    });
  }

  editConfirmed = (data, todoListId) => {
    this.props.editTodoList(data, todoListId);
    this.onEditTodoListDialogClose();
  }
}

export default withRouter(Sidebar);
