import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '@ui-kit/Spacer/Spacer';
import classes from './AddTodo.module.scss';

class AddTodo extends React.PureComponent {
  state = {
    title: {
      value: null,
      isValid: false
    }
  }

  render() {
    return (
      <Form className={classes.AddTodo__Form}>
        <Form.Group controlId="title" className={classes.AddTodo__TitleField}>
          <Form.Control
            autoComplete="off"
            placeholder="What needs to be done?"
            onChange={this.onTitleChange}
          />
        </Form.Group>

        <Spacer mode="horizontal"/>

        <Button
          variant="primary"
          disabled={!this.state.title.isValid}
          onClick={this.addTodo}
        >
          Add Todo
        </Button>
      </Form>
    );
  }

  onTitleChange = (e) => {
    const value = e.target.value;
    const isValid = value?.length >= 3;
    this.setState({
      ...this.state,
      title: {
        value,
        isValid
      }
    });
  }

  addTodo = () => {

  }
}

export default AddTodo;
