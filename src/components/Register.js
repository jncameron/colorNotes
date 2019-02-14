import React from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";
import "./Register.css";

class Register extends React.Component {
  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    console.log("fetching");
    fetch("http://localhost:8081/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        console.log("user is ", user);
        if (user.Id) {
          this.props.getUser({
            name: user.name,
            email: user.email,
            id: user.Id
          });
          this.props.authenticate(true);
        }
      });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button className="ui inverted green" type="submit" id="reg-btn">
            <div>
              <Icon name="signup" />
            </div>
          </Button>
        }
      >
        <Modal.Header className="ui center aligned">Register</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="John Smith"
                  onChange={this.onNameChange}
                  type="text"
                />
              </Form.Field>
              <Form.Field>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  onChange={this.onEmailChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  className="signinInputs"
                  onChange={this.onPasswordChange}
                />
              </Form.Field>
              <Form.Field />
              <Button
                type="submit"
                className="ui inverted violet"
                id="signin-btn"
                onClick={this.onSubmitRegister}
                value="Register"
              >
                <div>
                  <i className="right arrow icon" />
                </div>
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Register;
