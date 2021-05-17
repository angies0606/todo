import Nav from 'react-bootstrap/Nav';
import DropdownThreeDots from '@ui-kit/Dropdown-ThreeDots/Dropdown-ThreeDots';
import classes from './Sidebar.module.scss';

function Sidebar({className, todoLists}) {
  return (
    <Nav defaultActiveKey="/home" className={className + ' flex-column bg-light'}>
      {
        todoLists.map(todoList =>
          <Nav.Link key={todoList.id} className={classes.NavLink} as={'span'}>
            {todoList.title}
            <DropdownThreeDots />
          </Nav.Link>
        )
      }
    </Nav>
  )
}

export default Sidebar;