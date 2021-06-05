import {Component} from 'react'
import Checkbox from '@ui-kit/Checkbox/Checkbox';
import classes from "./Todo.module.scss";
import CloseButton from '@ui-kit/Button/CloseButton/CloseButton';

// function getStateFromProps(props) {
//   return {
//     isEnabled: Boolean(props.isEnabled),
//     prevProps: {
//       isEnabled: props.isEnabled
//     }
//   };
// }

/**
 * Props:
 * - todo: object
 * - onCheck: (isChecked: boolean) => void
 */
class Todo extends Component {

  // state = getStateFromProps(this.props);
 state = {
   isHovered: false
 }
  // static getDerivedStateFromProps(props, state) {
  //   if (state.prevProps?.isEnabled !== props.isEnabled) {
  //     return getStateFromProps(props);
  //   }
  //   return null;
  // }

  render() {
    return (
      <div className={classes.Todo}  
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}>
        <Checkbox value={this.props.todo.isChecked} onChange={this.onChange} size={24}/>
        <span className={classes.Todo__Text}>
          {this.props.todo.title}
        </span>
        {this.state.isHovered
          ? <CloseButton 
              className={classes.Todo__CloseButton} 
              onClick={() => this.props.deleteTodo()} 
            />
          : null
        }
      </div>
    );
  }


  onChange = isChecked => {
    this.props.onCheck(isChecked);
    // this.setState({
    //   ...this.state,
    //   isDone
    // });
  };

  onEnter = () => {
    this.setState({
      isHovered: true
    })
  }

  onLeave = () => {
    this.setState({
      isHovered: false
    })
  }

}

export default Todo;

