import Navbar from '@components/Navbar/Navbar';
import SidebarContainer from '@components/SidebarContainer/SidebarContainer';
import TodoList from '@features/todo-list/TodoList/TodoList';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <Navbar className={classes.Navbar}/>
      <SidebarContainer className={classes.SidebarContainer}>
        <TodoList />
      </SidebarContainer>
    </div>
  );
}

export default App;
