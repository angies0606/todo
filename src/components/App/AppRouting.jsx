import classes from "./App.module.scss";
import history from "../../history";
import TodoListCardConnected from "@features/todo-list/TodoListCard/TodoListCard.connected";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import SidebarContainer from "@components/SidebarContainer/SidebarContainer";
import Navbar from "@components/Navbar/Navbar";
import HomePage from "@components/HomePage/HomePage";
import AppProviders from "./AppProviders";

export function AppRouting() {
  return (
    <ConnectedRouter history={history}>
      <AppProviders>
        <div className={classes.App}>
          <Navbar className={classes.App__Navbar} />
            <SidebarContainer className={classes.App__SidebarContainer}>
              <Switch>
                <Route path='/' exact>
                  <HomePage />
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
                />
                <Redirect from='*' to='/' />
              </Switch>
            </SidebarContainer>
        </div>
      </AppProviders>
    </ConnectedRouter>
  );
}

export default AppRouting;