import {useEffect, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {ThreeDotsVertical} from 'react-bootstrap-icons';
import classes from './Sidebar.module.scss';
import Dropdown from '@ui-kit/Dropdown/Dropdown';
import TodoListDialog from '@dialogs/TodoListDialog/TodoListDialog';


function Sidebar({
  addTodoLists,
  className,
  todoLists,
  deleteTodoList,
  editTodoList
}) {
  const [editedTodoList, setEditedTodoList] = useState(null);
 
  useEffect(() => {
    fetch('http://localhost:8000/todo-lists')
      .then(response => {
        return response.json();
      })
      .then(todoLists => {
        addTodoLists(todoLists);
      });
  }, [addTodoLists]);

  const deleteTodolist = todoList => {
    deleteTodoList(todoList.id);
  }

  const editTodolist = todoList => {
    setEditedTodoList(todoList);
  }

  const onEditTodoListDialogClose = () => {
    setEditedTodoList(null);
  }

  const editConfirmed = (data, todoListId) => {
    editTodoList(data, todoListId);
    onEditTodoListDialogClose();
  }
  
  return (
    <>
      <Nav defaultActiveKey="/home" className={className + ' flex-column bg-light'}>
        {
          todoLists.map(todoList =>
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
                    onClick: () => deleteTodolist(todoList)
                  },
                  {
                    title: 'Edit',
                    onClick: () => editTodolist(todoList)
                  },
                ]}
              />
            </Nav.Link>
          )
        }
      </Nav>
      <TodoListDialog
        show={Boolean(editedTodoList)}
        onClose={onEditTodoListDialogClose}
        onConfirm={data => editConfirmed(data, editedTodoList.id)}
        title={'Edit list'}
        confirmText={'Edit'}
        todoList={editedTodoList}
        mode={'editOld'}
      />
    </>
  )
}

export default withRouter(Sidebar);
