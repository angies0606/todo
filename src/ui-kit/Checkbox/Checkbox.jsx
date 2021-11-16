import { useEffect, useState } from 'react';
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
  size
}) {
  // state = getStateFromProps(this.props);
 
  // static getDerivedStateFromProps(props, state) {
  //   if (state.prevProps?.value !== props.value) {
  //     return getStateFromProps(props);
  //   }
  //   return null
  // }
  const onClick = () => {
    const newValue = !value
    onChange && onChange(newValue);
  }
  return (
    <span className={classes.Checkbox} onClick={() => onClick()} >
      {value
        ? <CheckSquare size={size} />
        : <Square size={size}/>
      }
    </span>
  );
}

export default Checkbox;