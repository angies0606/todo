import classes from "./Card.module.scss";
import classNames from "classnames";

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

export default Card;