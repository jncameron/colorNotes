import React, { Component } from 'react';

class NewNote extends Component {

  state = { title: '' };

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.title);
  }


  render() {
    return(
      <div className="ui segment">
        <form onsubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>New Note Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.setState({title: e.target.value})}
            />
          </div>
          <div>
            {this.state.title}
          </div>
        </form>

      </div>
    )
  }
}

export default NewNote;