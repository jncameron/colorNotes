import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import "./NewNote.css";

const initialState = {
  color: "red",
  colorCode: "#B03060"
};

class NewNote extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onFormSubmit = e => {
    e.preventDefault();
    if (this._inputElement.value !== "") {
      var newNote = {
        text: this._inputElement.value,
        edit: false,
        completed: false,
        color: this.state.color,
        clicked: false
      };
      this.props.onSubmit(newNote);
    }
    this._inputElement.value = "";
  };

  chooseColor = () => {
    let colors = [
      "red",
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink"
    ];
    let colorCodes = [
      "#B03060",
      "#FE9A76",
      "#f9ca24",
      "#32CD32",
      "#016936",
      "#008080",
      "#0E6EB8",
      "#EE82EE",
      "#4834d4",
      "#be2edd"
    ];
    let currentColorIndex = colors.indexOf(this.state.color) + 1;
    this.setState({
      color: colors[currentColorIndex],
      colorCode: colorCodes[currentColorIndex]
    });
    return colorCodes[currentColorIndex];
  };

  render() {
    let placeholder = "What's on your mind today?";
    if (!!this.props.authenticated) {
      placeholder = `What's on your mind, ${this.props.user.name}?`;
    }
    return (
      <div>
        <Segment className="ui raised padded compact" id="note-input">
          <form onSubmit={this.onFormSubmit}>
            <div>
              <div className="ui input focus new-note-input">
                <input
                  ref={a => (this._inputElement = a)}
                  placeholder={placeholder}
                  type="text"
                />
                <div
                  className={`ui label`}
                  style={{ background: this.state.colorCode }}
                  id="note-color"
                  onClick={this.chooseColor}
                />
                <Button
                  type="submit"
                  className="ui inverted violet"
                  id="add-btn"
                >
                  <div>
                    <i className="right arrow icon" />
                  </div>
                </Button>
              </div>
            </div>
            <div />
          </form>
        </Segment>
      </div>
    );
  }
}

export default NewNote;
