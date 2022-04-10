// @ts-nocheck
import React from "react";
import classes from "./Dropdown.module.scss";
import classNames from "classnames";
import BootstrapDropdown from "react-bootstrap/Dropdown";

function Dropdown (props) {
  const iconClasses = classNames(classes.Dropdown__Trigger, props.className);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      className={iconClasses}
    >
      {children}
      <props.icon />
    </span>
  ));

  return (
      <BootstrapDropdown>
        <BootstrapDropdown.Toggle as={CustomToggle} />
        <BootstrapDropdown.Menu size='sm' title=''>
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