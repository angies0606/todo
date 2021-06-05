import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';

function TodoListCard() {
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

        <AddTodoFormConnected todoListId='todoList2' />

        <Spacer />

        <TodosCollectionConnected todoListId='todoList2' />

        <Spacer />

      </Card.Body>
    </Card>
  );
}

export default TodoListCard;
