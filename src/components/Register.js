import React from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:5500/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
            <Modal trigger={
              <Button 
              className="ui inverted green"
              type="submit" 
              id="reg-btn">
                <div >
                <Icon name="signup" />
                </div>
              </Button>
            }>
            <Modal.Header className="ui center aligned">Register</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                      <label>Name</label>
                      <input placeholder='John Smith'/>
                    </Form.Field>
                    <Form.Field>
                      <label>Email Address</label>
                      <input placeholder='name@example.com'/>
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input type="password" className="signinInputs" />
                    </Form.Field>
                    <Form.Field>
                      <label>Repeat Password</label>
                      <input type="password" className="signinInputs" />
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button
                      type="submit" 
                      className="ui inverted violet"
                      id="signin-btn" >
                        <div>
                          <i className="right arrow icon"></i>
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