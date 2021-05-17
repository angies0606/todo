import Card from 'react-bootstrap/Card';
import TodoListItem from '@components/TodoListItem/TodoListItem';
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

        <TodoListItem text="asdfgqewg" />
        <TodoListItem text="qwertyu" isEnabled={true}/>
        <TodoListItem text="zxcvbnm" />
      </Card.Body>
    </Card>
  );
}

export default TodoList;