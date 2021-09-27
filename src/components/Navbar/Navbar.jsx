import { Link } from 'react-router-dom';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import AddTodoListButtonConnected from '@ui-kit/Button/AddTodoListButton/AddTodoListButton.connected';
import classes from './Navbar.module.scss';

function Navbar({className}) {
  return (
    <BootstrapNavbar bg="light" expand="lg" className={className}>
      <div className={classes.Navbar__Content}>
        <BootstrapNavbar.Brand>
          <Link to='/'>
            WhatToDo
          </Link>
        </BootstrapNavbar.Brand>
        <AddTodoListButtonConnected />
      </div>
    </BootstrapNavbar>
  );
}

export default Navbar;