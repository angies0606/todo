import {useState, useCallback} from 'react'
import Checkbox from '@ui-kit/Checkbox/Checkbox';
import classes from "./Todo.module.scss";
import {BackspaceReverse, Check2Circle, Pen, XCircle} from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from '@ui-kit/Button/Button/Button';
import {useProgressContext} from '@contexts/progress.context';
import CircularProgress from '@mui/material/CircularProgress';


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
function Todo ({
  onCheck,
  todo,
  editTodo,
  deleteTodo
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [isProgress, setIsProgress] = useState(false);
  const {increment, decrement, progressCounter} = useProgressContext();

  // state = getStateFromProps(this.props);
  // state = {
  //   isHovered: false,
  //   isEditMode: false,
  //   editText: ''
  // }

  // static getDerivedStateFromProps(props, state) {
  //   if (state.prevProps?.isEnabled !== props.isEnabled) {
  //     return getStateFromProps(props);
  //   }
  //   return null;
  // }

  // const setProgresses = useCallback(value => {
  //   setIsProgress(value)
  //   debugger
  //   console.log(progressCounter)
  //   if (value) {
  //     increment()
  //   } else {
  //     decrement()
  //   }
  // }, [setIsProgress, increment, decrement, progressCounter])

  const startProgress = useCallback(() => {
    setIsProgress(true);
    increment();
  }, [setIsProgress, increment]);

  const endProgress = useCallback(() => {
    setIsProgress(false);
    decrement();
  }, [setIsProgress, decrement]);

  const onChange = useCallback(isChecked => {
    startProgress();
    onCheck({
      id: todo.id,
      isChecked: isChecked
    }).finally(endProgress);
  }, [startProgress, endProgress, onCheck, todo]);

  const onEnter = () => {
    setIsHovered(true);
  }

  const onLeave = () => {
    setIsHovered(false);
  }

  const onEditClick = () => {
    setIsEditMode(true);
    setEditedText(todo.title);
  }

  const onTodoTextChange = e => {
    setEditedText(e.target.value);
  }

  const onKeyPress = e => {
    if (e.which === 13) {
      onSaveEditing();
    }
  }

  const onKeyUp = e => {
    if (e.which === 27) {
     stopEditing();
    }
  }

  const onBackReverse = () => {
    stopEditing();
  }

  const onSaveEditing = () => {
    setIsProgress(true);
    increment()
    editTodo({
      title: editedText, 
      id: todo.id
    })
    .then(() => stopEditing())
    .finally(() => {
      decrement()
      setIsProgress(false)
    });
  }

  const stopEditing = () => {
    setIsEditMode(false);
    setEditedText('');
  }
  const todoClasses = [classes.Todo];
  if(isEditMode) {
    todoClasses.push(classes['Todo--edit']);
  }
 

  return (
    <div
      className={todoClasses.join(' ')}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Checkbox value={todo.isChecked} onChange={onChange} size={24}/>
      <span className={classes.Todo__Text}>
        {isEditMode
          ? <Form.Control
              autoFocus={true}
              size="sm"
              type="text"
              value={editedText}
              onChange={onTodoTextChange}
              onKeyPress={onKeyPress}
              onKeyUp={onKeyUp}
              // onBlur={onBlur}
            />
          : todo.title
        }
      </span>
      {isHovered && !isEditMode && !isProgress
        ? <>
            <Button
              Icon={Pen}
              onClick={onEditClick}
              tooltipTitle='Edit todo'
            />
            <Button
              Icon={XCircle}
              onClick={() => deleteTodo()}
              tooltipTitle='Delete todo'
            />
          </>
        : null
      }
      {isEditMode && !isProgress
        ? <>
            <Button
              Icon={Check2Circle}
              onClick={onSaveEditing}
            />
            <Button 
              Icon={BackspaceReverse}          
              onClick={onBackReverse}
            />
          </>
        : null
      }
      {
        isProgress &&
        <CircularProgress
          variant='indeterminate'
          color='primary'
          className={classes.Todo__ProgressBar}
          style={{
            height: 20,
            width: 20
          }}
        />
      }
    </div>
  );
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