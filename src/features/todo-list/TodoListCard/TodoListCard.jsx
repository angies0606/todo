import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import { Redirect } from 'react-router-dom';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';

function TodoListCard({todoList}) {
  if(!todoList) {
    return <Redirect to='/'/>;
  }
  return (
    <Card className={classes.Card}>
      <Card.Body>
        <Card.Title>
          {todoList.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {todoList.description}
        </Card.Subtitle>

        <Spacer />

        <AddTodoFormConnected todoListId={todoList.id} />

        <Spacer />

        <TodosCollectionConnected todoListId={todoList.id} />

        <Spacer />

      </Card.Body>
    </Card>
  );
}

export default TodoListCard;
