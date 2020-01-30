import React from "react";
import { Modal, Button, ButtonGroup, Form } from "react-bootstrap";

import { Route, Redirect } from "react-router-dom";
import "./Register.css";

const URL = "http://cnapi-env.gdmmdmsy82.ap-southeast-2.elasticbeanstalk.com/";

// const URL = "http://localhost:8081/";

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
    fetch(`${URL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())

      .then(returned => {
        const user = returned.user;
        const token = returned.token;

        if (user._id) {
          this.props.getUser({
            name: user.name,
            email: user.email,
            _id: user._id
          });
          this.props.authenticate(true);
          localStorage.setItem("authtoken", token);
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.props.onHide}
        trigger={
          <button className="btn btn-success" type="submit" id="reg-btn">
            <div>{/* <Icon name="signup" /> */}</div>
          </button>
        }
      >
        <Modal.Header
          style={{
            display: "inline",
            alignItems: "center",
            textAlign: "center"
          }}
          closeButton
        >
          <strong>Sign Up</strong>
        </Modal.Header>
        <div className="modal-content">
          <div className="modal-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label>Name</label>
                <Form.Control
                  placeholder="John Smith"
                  onChange={this.onNameChange}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Form.Control
                  type="password"
                  className="signinInputs"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div />
              <Button
                variant="primary"
                type="submit"
                id="signin-btn"
                onClick={this.onSubmitRegister}
                value="Register"
              >
                <div>
                  <p style={{ margin: 0 }}>Sign Up</p>
                </div>
              </Button>
              <Button
                className="float-right"
                variant="warning"
                type="submit"
                id="signin-btn"
                onClick={this.props.switchToSignIn}
              >
                <div>
                  <p style={{ margin: 0 }}>Switch to Sign In</p>
                </div>
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Register;
