import React from "react";
import BootstrapDropdown from "react-bootstrap/Dropdown";
import classes from './Dropdown.module.scss';


function Dropdown (props) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <props.icon className={classes.Dropdown} />
    </span>
  ));

  return (
    <BootstrapDropdown>
      <BootstrapDropdown.Toggle as={CustomToggle} />
      <BootstrapDropdown.Menu size="sm" title="">
        {props.items.map((item) => {
          return <BootstrapDropdown.Item 
            onClick={item.onClick}
            key={item.title}
          >
            {item.title}
          </BootstrapDropdown.Item>
        })}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
}

export default Dropdown;