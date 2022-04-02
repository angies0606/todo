import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {ThreeDotsVertical} from 'react-bootstrap-icons';
import classes from './Sidebar.module.scss';
import Dropdown from '@ui-kit/Dropdown/Dropdown';
import TodoListDialog from '@dialogs/TodoListDialog/TodoListDialog';
import {DragDropContext} from 'react-beautiful-dnd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import * as api from '@api/api';
import useSnackbar from '@hooks/useSnackbar';

const sidebarDnDId = 'sidebar';

function Sidebar({
  putTodoLists,
  editTodoList,
  className,
  todoLists,
  deleteTodoList,
  todoListsIds
}) {
  
  const [editedTodoList, setEditedTodoList] = useState(null);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    api.getTodoLists().then(todoLists => {
      putTodoLists(todoLists);
    });
  }, [putTodoLists]);

  const onDeleteTodoList = async todoList => {
    await api.deleteTodoList(todoList)
    .then(() => {
      deleteTodoList(todoList);
    })
    .then(() => {
      enqueueSnackbar('Todo list was deleted successfully', 'success')
    })
    .catch((e) => {
      if(e?.response?.status >= 400 && e?.response?.status < 500) {
        enqueueSnackbar('Error! Deleting todo list failed', 'error'); 
      }
    })
  }

  const onEditTodoListConfirm = (editedData) => {
    return api.editTodoList(editedTodoList.id, editedData)
      .then(result => {
        editTodoList(result);
        onEditTodoListDialogClose();
      })
      .then(() => {
        onEditTodoListDialogClose();
        enqueueSnackbar('Todo list was edited successfully', 'success')
      })
      .catch((e) => {
        if(e?.response?.status >= 400 && e?.response?.status < 500) {
          enqueueSnackbar('Error! Editing todo list failed', 'error'); 
        }
      })
  }
  const todoListIsEdited = todoList => {
    setEditedTodoList(todoList);
  }

  const onEditTodoListDialogClose = () => {
    setEditedTodoList(null);
  }

  // const onDragEnd = (result) => {
  //   const {destination, source, draggableId} = result;
  //   if(!destination) {
  //     return;
  //   }
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === <source className="index" />
  //   ) {
  //     return;
  //   }
  //   /* пока что в проекте присутствует одна колонка, в которой совершается DnD, 
  //   когда будет групп с TodoLists - переписать константы column
  //   */
  //   const TodoListsIds = todoListsIds;
  //   TodoListsIds.splice(source.index, 1);
  //   TodoListsIds.splice(destination.index, 0 , draggableId);
    
  // }

  return (
  <>
    <Nav 
      defaultActiveKey="/home" 
      className={className + ' flex-column '}
    >
      {
        todoLists.map((todoList, index) => {
          return (
            <Link 
              to={`/todo-list/${todoList.id}`}
              className={classes.Sidebar__Link}
            >
              <Nav.Link
                className={classes.Sidebar__NavLink}
                as='span'
              >
                {todoList.title}
                <Dropdown
                  icon={ThreeDotsVertical}
                  className={classes.Sidebar__Dropdown} 
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
            </Link>
          )
        })
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
    // <>
    //   <DragDropContext onDragEnd={onDragEnd}>
    //     <Droppable droppableId={sidebarDnDId}>
    //       {(provided) => (
    //         <Nav 
    //           defaultActiveKey="/home" 
    //           className={className + ' flex-column '}
    //           ref={provided.innerRef}
    //           {...provided.droppableProps}
    //         >
    //           {
    //             todoLists.map((todoList, index) =>
    //               <Draggable key={todoList.id} draggableId={todoList.id.toString()} index={index}> 
    //                 {(provided) => (
    //                   <Nav.Link
    //                     {...provided.draggableProps}
    //                     {...provided.dragHandleProps}
    //                     ref={provided.innerRef}
    //                     className={classes.NavLink}
    //                     as='span'
    //                   >
    //                     <Link 
    //                       to={`/todo-list/${todoList.id}`}
    //                       className={classes.NavLink__Link}

    //                     >
    //                       {todoList.title}
    //                     </Link>
    //                     <Dropdown
    //                       icon={ThreeDotsVertical} 
    //                       items={[
    //                         {
    //                           title: 'Delete',
    //                           onClick: () => onDeleteTodoList(todoList)
    //                         },
    //                         {
    //                           title: 'Edit',
    //                           onClick: () => todoListIsEdited(todoList)
    //                         },
    //                       ]}
    //                     />
    //                   </Nav.Link>
    //                 )}
    //               </Draggable>
    //             )
    //           }
    //           {provided.placeholder}
    //         </Nav>
    //       )}
    //     </Droppable>
    //   </DragDropContext>
    //   <TodoListDialog
    //     show={Boolean(editedTodoList)}
    //     onClose={onEditTodoListDialogClose}
    //     onConfirm={onEditTodoListConfirm}
    //     title={'Edit list'}
    //     confirmText={'Edit'}
    //     todoList={editedTodoList}
    //     mode={'editOld'}
    //   />
    // </>
  )
}

export default Sidebar;
