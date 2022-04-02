import React from "react";
import BootstrapDropdown from "react-bootstrap/Dropdown";
import classes from './Dropdown.module.scss';
import classNames from "classnames";




function Dropdown (props) {
  const iconClasses = classNames(classes.Dropdown, props.className);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <props.icon className={iconClasses} />
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