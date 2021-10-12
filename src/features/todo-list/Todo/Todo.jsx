import {Component} from 'react'
import Checkbox from '@ui-kit/Checkbox/Checkbox';
import classes from "./Todo.module.scss";
import {BackspaceReverse, Check2Circle, Pen, XCircle} from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from '@ui-kit/Button/Button/Button';


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
    isHovered: false,
    isEditMode: false,
    editText: ''
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (state.prevProps?.isEnabled !== props.isEnabled) {
  //     return getStateFromProps(props);
  //   }
  //   return null;
  // }

  render() {
    const todoClasses = [classes.Todo];
    if(this.state.isEditMode) {
      todoClasses.push(classes['Todo--edit']);
    }

    return (
      <div
        className={todoClasses.join(' ')}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
      >
        <Checkbox value={this.props.todo.isChecked} onChange={this.onChange} size={24}/>
        <span className={classes.Todo__Text}>
          {this.state.isEditMode
            ? <Form.Control
                autoFocus={true}
                size="sm"
                type="text"
                value={this.state.editText}
                onChange={this.onTodoTextChange}
                onKeyPress={this.onKeyPress}
                onKeyUp={this.onKeyUp}
                // onBlur={this.onBlur}
              />
            : this.props.todo.title
          }
        </span>
        {this.state.isHovered && !this.state.isEditMode
          ? <>
              <Button 
                icon={Pen}
                onClick={this.onEditClick} 
              />
              <Button
                icon={XCircle}
                onClick={() => this.props.deleteTodo()} 
              />
            </>
          : null
        }
        {this.state.isEditMode
          ? <>
              <Button
                icon={Check2Circle}
                onClick={this.save}
              />
              <Button 
                icon={BackspaceReverse}          
                onClick={this.onBackReverse}
              />
            </>
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
      ...this.state,
      isHovered: true
    })
  }

  onLeave = () => {
    this.setState({
      ...this.state,
      isHovered: false
    })
  }

  onEditClick = () => {
    this.setState({
      ...this.state,
      isEditMode: true,
      editText: this.props.todo.title
    })
  }

  onTodoTextChange = e => {
    this.setState({
      ...this.state,
      editText: e.target.value
    });
  }

  onKeyPress = e => {
    switch (e.which) {
      case 13:
        this.save();
        break;
    }
  }

  onKeyUp = e => {
    switch (e.which) {
      case 27:
        this.stopEditing();
        break;
    }
  }

  onBackReverse = () => {
    this.stopEditing();
  }

  save = () => {
    this.stopEditing();
    this.props.editTodo(this.state.editText);
  }

  stopEditing = () => {
    this.setState({
      ...this.state,
      isEditMode: false,
      editText: ''
    });
  }
}

export default Todo;

// this.props.editTodo({
//   title: this.state.editText
// });
// this.setState({
//   title: {
//     value: '',
//     isValid: false
//   }
// });