import classes from './Card.module.scss';
import BootstrapCard from 'react-bootstrap/Card';
import classNames from 'classnames';

function Card ({
  children,
  todoList,
  DateBar,
}) {
  return (
    <div className={classes.Card__Box}>
      <div className={classes.Card__Header}>
        <div className={classes.Card__Title}>
          {todoList.title}
        </div>
        <div className={classNames(classes.Card__Subtitle, classes.Card__Description)}>
          {todoList.description}
        </div>
        <div className={classes.Card__Subtitle}>
          {DateBar}
        </div>
      </div>
      <div className={classes.Card__Body}>
        {children}
      </div>
      <div className={classes.Card__Footer}>
      </div>
    </div>
  )
}

{/* <Card className={classes.Card}>
      <Card.Header className={classNames(classes.TodoListCard__Header, "text-center")}>
       
        <Card.Subtitle className="mb-2 text-muted">
          {todoList.description}
        </Card.Subtitle>
        <Card.Subtitle className={classNames(classes.TodoListCard__Subtitle, "text-muted")}>
          <DateBar creationDate={todoList.createdAt}/>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body className={classes.TodoListCard__CardBody}>

        <Spacer />

        <AddTodoFormConnected
          todoListId={todoList.id}
          onAddTodo={onAddTodo}
        />

        <Spacer />

        <Scrollbar
          className={classes.TodoListCard__Scrollbar}
          scrollerId={classes.TodoListCard__ScrollTarget}
        >
          {isEmpty &&
            <NoData 
              className={classes.TodoListCard__NoData}
              imageStyle={{height: 130, width: 80}}
              message={'No todos yet'}
            />
          }
          <TodosCollectionConnected
            className={classes.TodoListCard__TodosCollection}
            todoListId={todoList.id}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            onCheckTodo={onCheckTodo}
            getTodos={getTodos}
            scrollableId={classes.TodoListCard__ScrollTarget}
          />
        </Scrollbar>
        
        <Spacer />

      </Card.Body>
      <Card.Footer className={classes.TodoListCard__Footer} />

    </Card> */}

    export default Card;