import React from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:5500/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
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
                      <input placeholder='John Smith'
                      onChange={this.onNameChange}
                      type="text"  
                    />
                    </Form.Field>
                    <Form.Field>
                      <label>Email Address</label>
                      <input 
                        type="email"
                        placeholder='name@example.com'
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
                    <Form.Field>
                    </Form.Field>
                    <Button
                      type="submit" 
                      className="ui inverted violet"
                      id="signin-btn" 
                      onClick={this.onSubmitSignIn}
                      value="Register">
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