import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Signin.css";

const URL = "http://cnapi-env.gdmmdmsy82.ap-southeast-2.elasticbeanstalk.com/";

// const URL = "http://localhost:8081/";

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
          const returned = JSON.parse(text);
          const user = returned.user;
          const token = returned.token;
          if (!!user._id) {
            this.props.getUser(user);
            this.props.authenticate(true);
            localStorage.setItem("authtoken", token);
          }
        } catch (err) {
          console.log(text);
          if (text === "no dice") {
            this.setState({
              emailLabel: "Incorrect Email or Password",
              emailInput: "ui input error",
              passwordInput: "ui input error",
              emailError: "error"
            });
          }
        }
      });
  };

  render(props) {
    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.props.onHide}
        // trigger={
        //   <button className="btn btn-success" type="submit" id="signin-btn">
        //     <div>{/* <Icon name="sign in" /> */}</div>
        //   </button>
        // }
      >
        <Modal.Header
          style={{
            display: "inline",
            alignItems: "center",
            textAlign: "center"
          }}
          closeButton
        >
          <strong>Sign In</strong>
        </Modal.Header>
        <div className="modal-content">
          <div className="modal-body">
            <Form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label>{this.state.emailLabel}</label>
                <div className={this.state.emailError}>
                  <Form.Control
                    type="email"
                    placeholder="name@email.com"
                    onChange={this.onEmailChange}
                    className={this.state.emailInput}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>{this.state.passwordLabel}</label>
                <div className={this.state.passwordError}>
                  <Form.Control
                    type="password"
                    className="signinInputs"
                    onChange={this.onPasswordChange}
                    className={this.state.passwordInput}
                  />
                </div>
              </div>
              <div className="form-group">
                <Button
                  variant="primary"
                  type="submit"
                  id="signin-btn"
                  onClick={this.onSubmitSignIn}
                >
                  <div>
                    <p style={{ margin: 0 }}>Sign in</p>
                  </div>
                </Button>
                <Button
                  className="float-right"
                  variant="warning"
                  type="submit"
                  id="signin-btn"
                  onClick={this.props.switchToSignUp}
                >
                  <div>
                    <p style={{ margin: 0 }}>Switch to Sign up</p>
                  </div>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Signin;
