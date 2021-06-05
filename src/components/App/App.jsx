import Navbar from '@components/Navbar/Navbar';
import SidebarContainer from '@components/SidebarContainer/SidebarContainer';
import TodoListCard from '@features/todo-list/TodoListCard/TodoListCard';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <Navbar className={classes.Navbar}/>
      <SidebarContainer className={classes.SidebarContainer}>
        <TodoListCard />
      </SidebarContainer>
    </div>
  );
}

export default App;
