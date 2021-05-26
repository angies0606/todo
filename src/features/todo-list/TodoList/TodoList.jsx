import Card from 'react-bootstrap/Card';
import Todo from '@features/todo-list/Todo/Todo';
import AddTodo from '@features/todo-list/AddTodo/AddTodo';
import Spacer from '@ui-kit/Spacer/Spacer';
import classes from './TodoList.module.scss';

function TodoList() {
  return (
    <Card className={classes.Card}>
      <Card.Body>
        <Card.Title>
          Todo List Title
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Todo List Description
        </Card.Subtitle>

        <Spacer />

        <AddTodo />

        <Spacer />

        <Todo text="asdfgqewg" />
        <Todo text="qwertyu" isEnabled={true}/>
        <Todo text="zxcvbnm" />
      </Card.Body>
    </Card>
  );
}

export default TodoList;
