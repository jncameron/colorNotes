import React from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";
import "./Signin.css";

const URL = "http://cnapi-env.gdmmdmsy82.ap-southeast-2.elasticbeanstalk.com/";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      emailLabel: "Email Address",
      emailInput: "ui input focus",
      passwordLabel: "Password",
      passwordInput: "ui input focus",
      emailError: "",
      passwordError: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch(`${URL}signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.text())
      .then(text => {
        try {
          const user = JSON.parse(text);
          if (!!user._id) {
            this.props.getUser(user);
            this.props.authenticate(true);
          }
        } catch (err) {
          console.log(text);
          if (text === "Email not found") {
            this.setState({
              emailLabel: "Email Address Not Found",
              emailInput: "ui input error",
              emailError: "error"
            });
          } else if (text === "Invalid Password") {
            this.setState({
              passwordLabel: "Incorrect Password",
              passwordInput: "ui input error",
              passwordError: "error"
            });
          }
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
                <label>{this.state.emailLabel}</label>
                <div className={this.state.emailError}>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    onChange={this.onEmailChange}
                    className={this.state.emailInput}
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <label>{this.state.passwordLabel}</label>
                <div className={this.state.passwordError}>
                  <input
                    type="password"
                    className="signinInputs"
                    onChange={this.onPasswordChange}
                    className={this.state.passwordInput}
                  />
                </div>
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
