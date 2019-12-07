import React from "react";
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

  render() {
    return (
      <div
        className="modal"
        trigger={
          <button className="btn btn-success" type="submit" id="signin-btn">
            <div>{/* <Icon name="sign in" /> */}</div>
          </button>
        }
      >
        <div className="modal-header">Sign In</div>
        <div className="modal-content">
          <div className="modal-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label>{this.state.emailLabel}</label>
                <div className={this.state.emailError}>
                  <input
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
                  <input
                    type="password"
                    className="signinInputs"
                    onChange={this.onPasswordChange}
                    className={this.state.passwordInput}
                  />
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-info"
                  id="signin-btn"
                  onClick={this.onSubmitSignIn}
                >
                  <div>
                    <i className="right arrow icon" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
