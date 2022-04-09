import classNames from 'classnames';
import { useEffect, useState, useCallback } from 'react';
import { CheckSquare, Square } from 'react-bootstrap-icons';
import classes from './Checkbox.module.scss';

// function Checkbox({value, onChange}) {
//   return (
    
//   )
// }

// function getStateFromProps(props) {
//   return {
//     value: props.value,
//     prevProps: {
//       value: props.value
//     }
//   };
// }

function Checkbox ({
  value,
  onChange,
  size, 
  isDisabled
}) {
  // state = getStateFromProps(this.props);
 
  // static getDerivedStateFromProps(props, state) {
  //   if (state.prevProps?.value !== props.value) {
  //     return getStateFromProps(props);
  //   }
  //   return null
  // }

 const onClick = () => {
    if(isDisabled) return;
    const newValue = !value
    onChange && onChange(newValue);
  }

  return (
    <span
      className={classNames(classes.Checkbox, {
        [classes['Checkbox--disabled']]: isDisabled
      })}
      onClick={onClick}
    >
      {value
        ? <CheckSquare size={size} className={classes.Checkbox__CheckSquare} />
        : <Square size={size} />
      }
    </span>
  );
}

export default Checkbox;