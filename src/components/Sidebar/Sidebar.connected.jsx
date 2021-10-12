import {
  deleteTodoListActionCreator,
  editTodoListActionCreator,
  addTodoListsActionCreator
} from '@store/actions';
// import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => ({
  todoLists: state.todoLists.map(todoListId => state.entities.todoLists[todoListId])
  // routerState: state.router
});

const mapDispatchToProps = (dispatch) => {
  return {
    editTodoList: (data, todoListId) => {
      dispatch(editTodoListActionCreator(data, todoListId));
    },
    deleteTodoList: (todoListId) => {
      dispatch(deleteTodoListActionCreator(todoListId));
      // if (isRedirectToHome) {
      //   dispatch(push('/'));
      // }
    },
    addTodoLists: todoLists => {
      dispatch(addTodoListsActionCreator(todoLists))
    }
  };
};

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     ...ownProps,
//     deleteTodoList: todoListId => {
//       const isCurrentlyActivated = stateProps.routerState.location.pathname === `/todo-list/${todoListId}`;
//       dispatchProps.deleteTodoList(todoListId, isCurrentlyActivated);
//     }
//   };
// }

const SidebarConnected = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarConnected;