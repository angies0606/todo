import { Component } from 'react';
import { CheckSquare, Square } from 'react-bootstrap-icons';
import classes from './Checkbox.module.scss';

// function Checkbox({value, onChange}) {
//   return (
    
//   )
// }

function getStateFromProps(props) {
  return {
    value: props.value,
    prevProps: {
      value: props.value
    }
  };
}

class CheckboxClass extends Component {

  state = getStateFromProps(this.props);

  static getDerivedStateFromProps(props, state) {
    if (state.prevProps?.value !== props.value) {
      return getStateFromProps(props);
    }
    return null
  }

  render() {
    return (
      <span className={classes.Checkbox} onClick={() => this.onClick()} >
        {this.state.value
          ? <CheckSquare size={this.props.size} />
          : <Square size={this.props.size}/>
        }
      </span>
    );
  }

  onClick() {
    const newValue = !this.state.value
    this.setState({
      value: newValue
    });
    this.props.onChange && this.props.onChange(newValue);
  }
}

export default CheckboxClass;