import React, { Component } from "react";

import "./NewNote.css";

const initialState = {
  color: "red",
  colorCode: "#B03060",
  colorIndex: 0
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
    this.chooseColor();
  };

  chooseColor = () => {
    let colors = [
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
    this.setState(prevState => {
      if (prevState.colorIndex < colors.length - 1) {
        return {
          colorIndex: prevState.colorIndex + 1,
          color: colors[this.state.colorIndex],
          colorCode: colorCodes[this.state.colorIndex]
        };
      } else {
        prevState.colorIndex = 0;
        return {
          colorIndex: prevState.colorIndex + 1,
          color: colors[this.state.colorIndex],
          colorCode: colorCodes[this.state.colorIndex]
        };
      }
    });
    // return colorCodes[this.state.colorIndex];
  };

  render() {
    let placeholder = "What's on your mind today?";
    if (!!this.props.authenticated) {
      placeholder = `What's on your mind, ${this.props.user.name}?`;
    }
    return (
      <div className="container justify-content-center">
        {/* <Segment className="ui raised padded compact" id="note-input"> */}
        <form onSubmit={this.onFormSubmit}>
          <div className="d-flex flex-row" style={{ margin: "10px" }}>
            <input
              className="w-100 form-control"
              ref={a => (this._inputElement = a)}
              placeholder={placeholder}
              type="text"
            />
            <button
              type="submit"
              className="w-25 btn btn-primary form-control"
              id="add-btn"
              style={{ background: this.state.colorCode, maxWidth: "80px" }}
              id="note-color"
            >
              <div>
                <img
                  src="/right-arrow.svg"
                  alt=""
                  width="20"
                  height="20"
                  title="sort old"
                />
              </div>
            </button>
          </div>

          <div />
        </form>
        {/* </Segment> */}
      </div>
    );
  }
}

export default NewNote;
