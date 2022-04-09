import {useState, useCallback} from 'react'
import Checkbox from '@ui-kit/Checkbox/Checkbox';
import classes from "./Todo.module.scss";
import {BackspaceReverse, Check2Circle, Pen, XCircle} from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from '@ui-kit/Button/Button/Button';
import Spinner from '@ui-kit/Spinner/Spinner';
import Modal from '@ui-kit/Modal/Modal';

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
  const [isModalShown, setIsModalShown] = useState(false);


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

  //TODO: вставить везде функции startProgress и endPogress где меняется isProgress
  const startProgress = useCallback(() => {
    setIsProgress(true);
  }, [setIsProgress]);

  const endProgress = useCallback(() => {
    setIsProgress(false);
  }, [setIsProgress]);

  const onCheckChange = useCallback(isChecked => {
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
    editTodo({
      title: editedText, 
      id: todo.id
    })
    .then(() => {
      stopEditing();
    })
    .finally(() => {
      setIsProgress(false);
    });
  }

  const onDeleteTodo = () => {
    setIsModalShown(true);
  }
  const onModalClose = () => {
    setIsModalShown(false);
  }
  const onDeleteTodoConfirm = () => {
    setIsModalShown(false);
    setIsProgress(true);
    deleteTodo()
    .finally(() => {
      setIsProgress(false);
    })
  }

  // const showSnackbar = (message) => {
  //   enqueueSnackbar(message, {
  //     variant: 'warning',
  //     autoHideDuration: 3000,
  //     anchorOrigin: {
  //       vertical: 'top',
  //       horizontal: 'left',
  //     },    
  //   });
  // }

  const stopEditing = () => {
    setIsEditMode(false);
    setEditedText('');
  }
  const todoClasses = [classes.Todo];
  if(isEditMode) {
    todoClasses.push(classes['Todo--edit']);
  }
 
  return (
    <>
      <div
        className={todoClasses.join(' ')}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        
        <Checkbox 
          value={todo.isChecked} 
          onChange={onCheckChange} 
          size={24} 
          isDisabled={isProgress}
        />
        <span className={classes.Todo__Text}>
          {isEditMode
            ? <Form.Control
                as='input'
                rows={1.5}
                autoFocus={true}
                size="sm"
                type="text"
                value={editedText}
                onChange={onTodoTextChange}
                onKeyPress={onKeyPress}
                onKeyUp={onKeyUp}
                style={{boxShadow: "none"}}
                // onBlur={onBlur}
              />
            : todo.title
          }
        </span>
        {isHovered && !isEditMode && !isProgress
          ? <div className={classes.Todo__ButtonBox}>
              <Button
                onClick={onEditClick}
                tooltipTitle='Edit todo'
              >
                <Pen size={20} className={classes.Todo__ButtonIcon} />
              </Button>
              <Button
                onClick={onDeleteTodo}
                tooltipTitle='Delete todo'
              >
                <XCircle size={20} className={classes.Todo__ButtonIcon} />
              </Button>
            </div>
          : null
        }
        {isEditMode && !isProgress
          ? <div className={classes.Todo__ButtonBox}>
              <Button
                onClick={onSaveEditing}
                tooltipTitle='Save changes'
              >
                <Check2Circle size={20} className={classes.Todo__ButtonIcon} />
              </Button>
              <Button 
                onClick={onBackReverse}
                tooltipTitle = 'Cancel'
              >
                <BackspaceReverse size={20} className={classes.Todo__ButtonIcon} />
              </Button>
            </div>
          : null
        }
        {
          isProgress &&
          <Spinner spinnerSize={{height: 20, width: 20}}/>
        }
      </div>
      <Modal show={isModalShown} onClose={onModalClose} onConfirm={onDeleteTodoConfirm} title={'Are you sure you want to delete this todo?'}/>
    </>
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