import React from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import './Signin.css';

class Signin extends React.Component {
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
              id="add-btn" 
              onClick={this.props.deleteNote}>
                <div >
                <Icon name="sign in" />
                </div>
              </Button>
            }>
            <Modal.Header className="ui center aligned">Sign In</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                      <label>Name</label>
                      <input placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button
                      type="submit" 
                      className="ui inverted violet"
                      id="add-btn" >
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

export default Signin;