import {
  Route,
  Redirect
} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { Card } from 'react-bootstrap';
import Navbar from '@components/Navbar/Navbar';
import SidebarContainer from '@components/SidebarContainer/SidebarContainer';
import TodoListCardConnected from '@features/todo-list/TodoListCard/TodoListCard.connected';
import classes from './App.module.scss';
import history from '../../history';
// import { useEffect } from "react";

function App() {
  return (
    <ConnectedRouter history={history}>
      <div className={classes.App}>
        <Navbar className={classes.Navbar}/>
        <SidebarContainer className={classes.SidebarContainer}>
          <Route path='/' exact>
            <Card>
              <Card.Body>
                <Card.Title>
                  Welcome!
                </Card.Title>
              </Card.Body>
            </Card>
          </Route>
          <Route
            path='/todo-list/:todoListId'// /todo-list/:ngreo32234?eriber=443tg todoListId - это динамический сегмент URL, который будет меняться
            exact
            render={(arg) => (
              <TodoListCardConnected todoListId={arg.match.params.todoListId} /> // передаем компоненту todoListId 
            )}
            // render={({match:{params:{todoListId}}}) => (
            //  <TodoListCardConnected todoListId={todoListId}/>
            // )} - деструктуризация аргумента функции
          ></Route>
          <Redirect from='*' to='/'></Redirect>
        </SidebarContainer>
      </div>
    </ConnectedRouter>
  );
}

export default App;
