import { Link } from 'react-router-dom';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import AddTodoListButtonConnected from '@ui-kit/Button/AddTodoListButton/AddTodoListButton.connected';
import classes from './Navbar.module.scss';
import Logo from '@assets/images/cooltext407590611940177.png';

function Navbar({className}) {
  return (
    <BootstrapNavbar expand="lg" className={className}>
      <div className={classes.Navbar__Content}>
        <BootstrapNavbar.Brand>
          <Link to='/'>
            {/* <Image> */}
              <img 
                // src='https://images.cooltext.com/5593011.png'
                src={Logo}
                width='200'
                height='50'
              />
            {/* </Image> */}
          </Link>
        </BootstrapNavbar.Brand>
        <AddTodoListButtonConnected />
      </div>
    </BootstrapNavbar>
  );
}

export default Navbar;