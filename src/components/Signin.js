import React from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";
import "./Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:8081/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (!!user.Id) {
          this.props.getUser(user);
          this.props.authenticate(true);
        }
      });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button className="ui inverted green" type="submit" id="signin-btn">
            <div>
              <Icon name="sign in" />
            </div>
          </Button>
        }
      >
        <Modal.Header className="ui center aligned">Sign In</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.onFormSubmit}>
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
                onClick={this.onSubmitSignIn}
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

export default Signin;
