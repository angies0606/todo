import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {ThreeDotsVertical} from 'react-bootstrap-icons';
import classes from './Dropdown-ThreeDots.module.scss';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <ThreeDotsVertical className={classes.ThreeDotsVertical} />
  </span>
));
function DropdownThreeDots() {
  return (
    <div className="DropdownThreeDots">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu size="sm" title="">
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownThreeDots;