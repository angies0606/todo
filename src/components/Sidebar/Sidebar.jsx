import * as api from "@api/api";
import classNames from "classnames";
import classes from "./Sidebar.module.scss";
import useSnackbar from "@components/SnackBarProvider/useSnackbar";
import {useTodoListDialogContext} from "@dialogs/TodoListDialog/todoListDialog.context";
import {useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Scrollbar from "@ui-kit/Scrollbar/Scrollbar";
import Modal from "@ui-kit/Modal/Modal";
import NoData from "@ui-kit/NoData/NoData";
import Tooltip from "@ui-kit/Tooltip/Tooltip";
import Dropdown from "@ui-kit/Dropdown/Dropdown";
import {ThreeDotsVertical} from "react-bootstrap-icons";
// import {DragDropContext} from "react-beautiful-dnd";
// import { Droppable, Draggable } from "react-beautiful-dnd";



// const sidebarDnDId = 'sidebar';

function Sidebar({
  className = '',
  putTodoLists,
  todoLists,
  deleteTodoList
}) {
  const [isTodoListsReady, setIsTodoListsReady] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [todoList, setTodoList] = useState(null);
  
  const {enqueueSnackbar} = useSnackbar();

  const {openEditTodoListDialog} = useTodoListDialogContext();
  
  useEffect(() => {
    api.getTodoLists().then(todoLists => {
      setIsTodoListsReady(true);
      putTodoLists(todoLists);
    });
  }, [putTodoLists]);
  
  const isShowNoData = todoLists?.length === 0 && isTodoListsReady;

  const onDeleteTodoList = (todoList) => {
    setIsModalShown(true);
    setTodoList(todoList);
  }

  const onDeleteTodoListConfirm = () => {
    setIsModalShown(false);
    return (
      api.deleteTodoList(todoList)
      .then(() => {
        deleteTodoList(todoList);
        enqueueSnackbar('Todo list was deleted successfully', 'success')
      })
      .catch((e) => {
        if(e?.response?.status >= 400 && e?.response?.status < 500) {
          enqueueSnackbar('Error! Deleting todo list failed', 'error'); 
        }
      })
    ) 
  }

  const todoListEditedMode = todoListInEditing => {
    openEditTodoListDialog(todoListInEditing);
  }

  const onModalClose = () => {
    setIsModalShown(false);
    setTodoList(null);
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
      defaultActiveKey='/home'
      className={classNames(
        className,
        classes.Sidebar,
        {
          [classes['Sidebar--empty']]: isShowNoData
        }
      )}
    >
      {
        isShowNoData &&
         <NoData 
          className={classes.Sidebar__NoData} 
          imageStyle={{height: 100, width: 80}} 
          message={'No todo lists yet'}
          />
      }

      <Scrollbar
        className={classes.Sidebar__Scrollbar}
        scrollerId={classes.Sidebar__ScrollTarget}
        background={{background: 'none'}}
        paddingBottom={{paddingBottom: 50}}
      >
        {
          todoLists?.length > 0 &&
          todoLists.map((todoList, index) => {
            return (
              <Tooltip title={todoList.title} placement='right' enterDelay={500} key={todoList.id}>
                <Link 
                  to={`/todo-list/${todoList.id}`}
                  className={classes.Sidebar__Link}
                >
                  <Nav.Link
                    className={classes.Sidebar__NavLink}
                    as='span'
                  >
                    <span className={classes.Sidebar__NavLinkTitle}>
                      {todoList.title}
                    </span>
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
                          onClick: () => todoListEditedMode(todoList)
                        },
                      ]}
                    />
                  </Nav.Link>
                </Link>
              </Tooltip>
            )
          })
        }
      </Scrollbar>
    </Nav>

    <Modal 
      show={isModalShown}
      onClose={onModalClose}
      onConfirm={onDeleteTodoListConfirm}
      title={'Are you sure you want to delete this todo list?'}
      isCloseButtonShown={false}
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
