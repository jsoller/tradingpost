import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { getLocationUserIPC, } from '../actions/ipcHandler';
import styles from './TradingPost.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return (this.state.username.length > 0 && this.state.password.length > 0);
  }

  handleChange = (event, id) => {
    this.setState({
      [id]: event.target.value
    });
  }

  handleSubmit = event => {
    getLocationUserIPC(this.state.username, this.state.password);
    // Below line stops the form from clearing
    // And the user precieved behavior of having to login twice
    event.preventDefault();
  }

  render() {
    if (this.props.loginsuccessful) {
      return <Redirect to='/p' />;
    }

    return (
      < div className={styles.leftsidehdr} >
        <h3 >Login</h3>
        <div className="Login">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup check className="sm">
              <Label>Username</Label>
              <Input
                autoFocus
                type="text"
                value={this.state.username}
                onChange={(event) => this.handleChange(event, 'username')}
              />
            </FormGroup>
            <FormGroup check className="sm">
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChange={(event) => this.handleChange(event, 'password')}
                type="password"
              />
            </FormGroup>
            <Button
              block
              className="sm"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  loginsuccessful: state.login.locationusers.length !== 0,
})

export default connect(
  mapStateToProps,
  {}
)(Login)
