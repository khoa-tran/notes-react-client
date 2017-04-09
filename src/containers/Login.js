import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    padding: '60px 0'
  },
  form: {
    margin: '0 auto',
    maxWidth: '320px'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className={css(styles.login)}>
        <form onSubmit={this.handleSubmit} className={css(styles.form)}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange} />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={ !this.validateForm() }
            type="submit">
            Login
          </Button>
        </form>
      </div>
    )
  }
}

export default Login;
