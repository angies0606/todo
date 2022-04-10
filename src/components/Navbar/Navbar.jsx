import classes from "./Navbar.module.scss";
import Logo from "@assets/images/cooltext407590611940177.png";
import AddTodoListButtonConnected from "@ui-kit/Button/AddTodoListButton/AddTodoListButton.connected";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Navbar({className}) {
  return (
    <BootstrapNavbar expand='lg' className={className}>
      <div className={classes.Navbar__Content}>
        <BootstrapNavbar.Brand>
          <Link to='/'>
            <img 
              src={Logo}
              width='200'
              height='50'
              alt='Logo'
            />
          </Link>
        </BootstrapNavbar.Brand>
        <AddTodoListButtonConnected />
      </div>
    </BootstrapNavbar>
  );
}

export default Navbar;