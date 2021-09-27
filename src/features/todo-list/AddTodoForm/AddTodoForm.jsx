import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '@ui-kit/Spacer/Spacer';
import classes from './AddTodoForm.module.scss';

class AddTodoForm extends React.PureComponent {
  state = {
    title: {
      value: '',
      isValid: false
    }
  }

  render() {
    return (
      <Form className={classes.AddTodo__Form} as="div">
        <Form.Group controlId="title" className={classes.AddTodo__TitleField}>
          <Form.Control
            autoComplete="off"
            placeholder="What needs to be done?"
            value={this.state.title.value}
            onChange={this.onTitleChange}
            onKeyPress={this.onKeyPress}
          />
        </Form.Group>

        <Spacer mode="horizontal"/>

        <Button
          variant="primary"
          disabled={this.isDisabled()}
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

  onKeyPress = e => {
    if (e.which === 13) {
      this.addTodo();
    }
  }

  addTodo = () => {
    if (this.isDisabled()) {
      return;
    }

    this.props.addTodo({
      title: this.state.title.value
    });
    this.setState({
      title: {
        value: '',
        isValid: false
      }
    });
  }

  isDisabled() {
    return !this.state.title.isValid;
  }
}

export default AddTodoForm;
