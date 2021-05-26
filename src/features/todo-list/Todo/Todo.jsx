import {Component} from 'react'
import Checkbox from '@ui-kit/Checkbox/Checkbox';
import classes from "./Todo.module.scss";

function getStateFromProps(props) {
  return {
    isEnabled: Boolean(props.isEnabled),
    prevProps: {
      isEnabled: props.isEnabled
    }
  };
}

class Todo extends Component {

  state = getStateFromProps(this.props);

  static getDerivedStateFromProps(props, state) {
    if (state.prevProps?.isEnabled !== props.isEnabled) {
      return getStateFromProps(props);
    }
    return null;
  }

  render() {
    return (
      <div className={classes.Todo}>
        <Checkbox value={this.state.isEnabled} onChange={this.onChange} size={24}/>
        <span className={classes.Todo__Text}>
          {this.props.text}
        </span>
      </div>
    );
  }

  onChange = isEnabled => {
    this.setState({
      ...this.state,
      isEnabled
    });
  };
}

export default Todo;