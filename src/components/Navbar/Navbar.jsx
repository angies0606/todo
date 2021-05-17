import BootstrapNavbar from 'react-bootstrap/Navbar';
import AddTodoListButtonConnected from '@ui-kit/Button/AddTodoListButton/AddTodoListButton.connected';
import classes from './Navbar.module.scss';

function Navbar() {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <div className={classes.Navbar__Content}>
        <BootstrapNavbar.Brand>WhatToDo</BootstrapNavbar.Brand>
        <AddTodoListButtonConnected />
      </div>
    </BootstrapNavbar>
  );
}

export default Navbar;