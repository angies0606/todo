import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {ThreeDotsVertical} from 'react-bootstrap-icons';
import classes from './Sidebar.module.scss';
import Dropdown from '@ui-kit/Dropdown/Dropdown';
import TodoListDialog from '@dialogs/TodoListDialog/TodoListDialog';
import * as api from '@api/api';


function Sidebar({
  putTodoLists,
  editTodoList,
  className,
  todoLists,
  deleteTodoList
}) {
  const [editedTodoList, setEditedTodoList] = useState(null);

  useEffect(() => {
    api.getTodoLists().then(todoLists => {
      putTodoLists(todoLists);
    });
  }, [putTodoLists]);

  const onDeleteTodoList = async todoList => {
    await api.deleteTodoList(todoList)

    deleteTodoList(todoList);
  };

  const onEditTodoListConfirm = (editedData) => {
    return api.editTodoList(editedTodoList.id, editedData)
      .then(result => {
        editTodoList(result);
        onEditTodoListDialogClose();
      })
  }
  const todoListIsEdited = todoList => {
    setEditedTodoList(todoList);
  }

  const onEditTodoListDialogClose = () => {
    setEditedTodoList(null);
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
                    onClick: () => onDeleteTodoList(todoList)
                  },
                  {
                    title: 'Edit',
                    onClick: () => todoListIsEdited(todoList)
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
        onConfirm={onEditTodoListConfirm}
        title={'Edit list'}
        confirmText={'Edit'}
        todoList={editedTodoList}
        mode={'editOld'}
      />
    </>
  )
}

export default Sidebar;
